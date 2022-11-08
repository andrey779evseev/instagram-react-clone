import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SettingsIcon from '@components/common/assets/icons/SettingsIcon'
import Avatar, { EnumAvatarSize } from '@components/common/avatar/Avatar'
import Button, { EnumButtonTheme } from '@components/common/button/Button'
import If from '@components/common/if/If'
import Skeleton from '@components/common/skeleton/Skeleton'
import SkeletonWrapper from '@components/common/skeleton/SkeletonWrapper'
import TextParser from '@components/common/text-parser/TextParser'
import UserStatsModel from '@api/common/models/responses/UserStatsModel'
import { FriendshipsService } from '@api/services/friendships/FriendshipsService'
import { UserService } from '@api/services/user/UserService'
import FollowingFollowersModal from './modals/FollowingFollowersModal'

const ProfileHeader = () => {
	const [isFollowingModal, setIsFollowingModal] = useState(false)
	const [isFollowersModal, setIsFollowersModal] = useState(false)
	const navigate = useNavigate()
	const { userId } = useParams()
	const isMyProfile = useMemo(() => userId === 'me', [userId])
	const qc = useQueryClient()

	// prettier-ignore
	const { data: user } =
	isMyProfile
		? useQuery({
			queryKey: ['user'],
			queryFn: UserService.GetCurrentUser,
		})
		: useQuery({
			queryKey: ['user', { id: userId }],
			queryFn: () => UserService.GetUser(userId!),
		})
	const profileUserId = useMemo(
		() => (isMyProfile ? user?.Id : userId),
		[userId, user]
	)
	const { data: stats, isLoading: isLoadingStats } = useQuery({
		queryKey: ['stats', { user: profileUserId }],
		queryFn: () => UserService.GetStats(profileUserId!),
		enabled: !isMyProfile || !!user?.Id,
	})
	const { data: isFollowed, isLoading: isLoadingIsFollowed } = useQuery({
		queryKey: ['is-followed', { user: userId }],
		queryFn: () => FriendshipsService.IsFollowed(userId!),
		enabled: !isMyProfile,
	})
	const followMutation = useMutation(() => FriendshipsService.Follow(userId!), {
		onSuccess: () => refetch(true),
	})
	const unfollowMutation = useMutation(
		() => FriendshipsService.Unfollow(userId!),
		{
			onSuccess: () => refetch(false),
		}
	)

	const refetch = (follow: boolean) => {
		// qc.invalidateQueries(['is-followed', { user: userId }])
		// qc.invalidateQueries(['stats', { user: profileUserId }])
		qc.setQueryData<boolean>(['is-followed', { user: userId }], (prev) => !prev)
		qc.setQueryData<UserStatsModel>(
			['stats', { user: profileUserId }],
			(prev) => {
				return {
					...prev,
					FollowersCount: follow
						? prev!.FollowersCount + 1
						: prev!.FollowersCount - 1,
				} as UserStatsModel
			}
		)
	}

	const changeFriendship = () => {
		if (isFollowed) unfollowMutation.mutate()
		else followMutation.mutate()
	}

	const goToEditProfile = () => {
		navigate('/settings/edit-profile')
	}

	return (
		<div className='flex justify-center'>
			<div className='flex items-center'>
				<SkeletonWrapper
					condition={isLoadingStats}
					skeleton={<Skeleton variant='circular' width={150} height={150} />}
				>
					<Avatar src={user?.Avatar} size={EnumAvatarSize.ExtraLarge} />
				</SkeletonWrapper>
				<div className='ml-[100px]'>
					<div className='flex items-center mb-6'>
						<SkeletonWrapper
							condition={isLoadingStats}
							skeleton={
								<Skeleton variant='text' style={{ fontSize: '28px' }} />
							}
							className='mr-5'
						>
							<div className='text-[28px] whitespace-nowrap font-light'>
								{user?.Nickname}
							</div>
						</SkeletonWrapper>
						<SkeletonWrapper
							condition={isLoadingStats}
							skeleton={<Skeleton variant='rounded' width={153} height={30} />}
						>
							<Button
								theme={
									isMyProfile
										? EnumButtonTheme.Secondary
										: EnumButtonTheme.Primary
								}
								onClick={isMyProfile ? goToEditProfile : changeFriendship}
								width='max-content'
								isLoading={
									followMutation.isLoading || unfollowMutation.isLoading
								}
							>
								{isMyProfile
									? 'Edit Profile'
									: isFollowed
										? 'Unfollow'
										: 'Follow'}
							</Button>
						</SkeletonWrapper>
						<SkeletonWrapper
							condition={isLoadingStats}
							skeleton={<Skeleton variant='rounded' width={24} height={24} />}
							className='ml-6'
						>
							<SettingsIcon width={24} height={24} />
						</SkeletonWrapper>
					</div>
					<SkeletonWrapper
						skeleton={<Skeleton variant='text' style={{ fontSize: '16px' }} />}
						condition={isLoadingStats}
					>
						<div className='flex items-center'>
							<div className='text-base whitespace-nowrap'>
								<span className='font-medium'>{stats?.PostsCount} </span>
								posts
							</div>
							<div
								className='text-base ml-10 whitespace-nowrap cursor-pointer'
								onClick={() => setIsFollowersModal(true)}
							>
								<span className='font-medium'>{stats?.FollowersCount} </span>
								followers
							</div>
							<div
								className='text-base ml-10 whitespace-nowrap cursor-pointer'
								onClick={() => setIsFollowingModal(true)}
							>
								<span className='font-medium'>{stats?.FollowingCount} </span>
								following
							</div>
						</div>
					</SkeletonWrapper>
					<SkeletonWrapper
						condition={isLoadingStats}
						skeleton={<Skeleton variant='text' style={{ fontSize: '16px' }} />}
						className='mt-6'
					>
						<div className='font-medium text-base'>{user?.Name}</div>
					</SkeletonWrapper>
					<SkeletonWrapper
						condition={isLoadingStats}
						skeleton={<Skeleton variant='text' style={{ fontSize: '16px' }} />}
					>
						<div className='text-base'>
							<TextParser text={user?.Description} />
						</div>
					</SkeletonWrapper>
				</div>
			</div>
			<If condition={isFollowingModal || isFollowersModal}>
				<FollowingFollowersModal
					onClose={() =>
						isFollowingModal
							? setIsFollowingModal(false)
							: setIsFollowersModal(false)
					}
					isFollowing={isFollowingModal}
				/>
			</If>
		</div>
	)
}

export default ProfileHeader
