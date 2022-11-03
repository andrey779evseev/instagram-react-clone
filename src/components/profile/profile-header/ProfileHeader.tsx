import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SettingsIcon from '@components/common/assets/icons/SettingsIcon'
import Avatar, { EnumAvatarSize } from '@components/common/avatar/Avatar'
import Button, { EnumButtonTheme } from '@components/common/button/Button'
import If from '@components/common/if/If'
import Skeleton from '@components/common/skeleton/Skeleton'
import SkeletonWrapper from '@components/common/skeleton/SkeletonWrapper'
import TextParser from '@components/common/text-parser/TextParser'
import { AccountService } from '@api/services/account/AccountService'
import FollowingFollowersModal from './modals/FollowingFollowersModal'

const ProfileHeader = () => {
	const [isFollowingModal, setIsFollowingModal] = useState(false)
	const [isFollowersModal, setIsFollowersModal] = useState(false)
	const { data: user } = useQuery({
		queryKey: ['user'],
		queryFn: AccountService.GetUser,
	})
	const { data: stats, isLoading } = useQuery({
		queryKey: ['stats'],
		queryFn: AccountService.GetStats,
	})
	const navigate = useNavigate()

	const goToEditProfile = () => {
		navigate('/settings/edit-profile')
	}

	return (
		<div className='flex justify-center'>
			<div className='flex items-center'>
				<SkeletonWrapper
					condition={isLoading}
					skeleton={<Skeleton variant='circular' width={150} height={150} />}
				>
					<Avatar src={user?.Avatar} size={EnumAvatarSize.ExtraLarge} />
				</SkeletonWrapper>
				<div className='ml-[100px]'>
					<div className='flex items-center mb-6'>
						<SkeletonWrapper
							condition={isLoading}
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
							condition={isLoading}
							skeleton={<Skeleton variant='rounded' width={153} height={30} />}
						>
							<Button
								theme={EnumButtonTheme.Secondary}
								onClick={goToEditProfile}
								width='max-content'
							>
								Edit Profile
							</Button>
						</SkeletonWrapper>
						<SkeletonWrapper
							condition={isLoading}
							skeleton={<Skeleton variant='rounded' width={24} height={24} />}
							className='ml-6'
						>
							<SettingsIcon width={24} height={24} />
						</SkeletonWrapper>
					</div>
					<SkeletonWrapper
						skeleton={<Skeleton variant='text' style={{ fontSize: '16px' }} />}
						condition={isLoading}
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
						condition={isLoading}
						skeleton={<Skeleton variant='text' style={{ fontSize: '16px' }} />}
						className='mt-6'
					>
						<div className='font-medium text-base'>{user?.Name}</div>
					</SkeletonWrapper>
					<SkeletonWrapper
						condition={isLoading}
						skeleton={<Skeleton variant='text' style={{ fontSize: '16px' }} />}
					>
						<div className='text-base'>
							<TextParser text={user!.Description} />
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
