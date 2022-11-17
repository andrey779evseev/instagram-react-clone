import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { memo, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SettingsIcon from '@components/common/assets/icons/SettingsIcon'
import Button from '@components/common/button/Button'
import Skeleton from '@components/common/skeleton/Skeleton'
import SkeletonWrapper from '@components/common/skeleton/SkeletonWrapper'
import TextParser from '@components/common/text-parser/TextParser'
import ExpandedUserModel from '@api/common/models/user/ExpandedUserModel'
import User from '@api/common/models/user/User'
import UserStatsModel from '@api/common/models/user/UserStatsModel'
import { FriendshipsService } from '@api/services/friendships/FriendshipsService'
import { UserService } from '@api/services/user/UserService'
import { EnumButtonTheme } from '@models/enums/EnumButtonTheme'

type PropsType = {
	user: User | ExpandedUserModel | undefined
	setIsFollowersModal: (value: boolean) => void
	setIsFollowingModal: (value: boolean) => void
}

const ProfileHeaderStats = (props: PropsType) => {
	const { user, setIsFollowingModal, setIsFollowersModal } = props
	const { userId } = useParams()
	const navigate = useNavigate()
	const qc = useQueryClient()
	const isMyProfile = useMemo(() => userId === 'me', [userId])
	const profileUserId = useMemo(
		() => (isMyProfile ? user?.Id : userId),
		[userId, user]
	)

	const { data: stats, isLoading: isLoadingStats } = useQuery({
		queryKey: ['stats', { user: profileUserId }],
		queryFn: () => UserService.GetStats(profileUserId!),
		enabled: !isMyProfile || !!user?.Id,
	})
	const { data: isFollowed } = useQuery({
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
		<div className='ml-[100px]'>
			<div className='flex items-center mb-6'>
				<SkeletonWrapper
					condition={isLoadingStats}
					skeleton={<Skeleton variant='text' style={{ fontSize: '28px' }} />}
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
							isMyProfile ? EnumButtonTheme.Secondary : EnumButtonTheme.Primary
						}
						onClick={isMyProfile ? goToEditProfile : changeFriendship}
						width='max-content'
						isLoading={followMutation.isLoading || unfollowMutation.isLoading}
					>
						{isMyProfile ? 'Edit Profile' : isFollowed ? 'Unfollow' : 'Follow'}
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
	)
}

export default memo(ProfileHeaderStats)
