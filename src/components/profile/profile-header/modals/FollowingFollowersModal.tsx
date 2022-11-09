import { useQuery } from '@tanstack/react-query'
import { memo, useMemo } from 'react'
import { useParams } from 'react-router'
import PeoplesIcon from '@components/common/assets/icons/PeoplesIcon'
import If from '@components/common/if/If'
import Modal from '@components/common/modal/Modal'
import ModalHeader from '@components/common/modal/header/ModalHeader'
import Spinner from '@components/common/spinner/Spinner'
import useWindowSize from '@hooks/UseWindowSize'
import { FriendshipsService } from '@api/services/friendships/FriendshipsService'
import { UserService } from '@api/services/user/UserService'
import FollowingFollowerItem from './FollowingFollowerItem'

type PropsType = {
	onClose: () => void
	isFollowing: boolean
}

const FollowingFollowersModal = (props: PropsType) => {
	const { onClose, isFollowing } = props
	const { userId } = useParams()
	const { windowHeight } = useWindowSize()

	const isMyProfile = useMemo(() => userId === 'me', [userId])

	const { data: user } = useQuery({
		queryKey: ['user'],
		queryFn: UserService.GetCurrentUser,
		enabled: isMyProfile,
	})

	const profileUserId = useMemo(
		() => (isMyProfile ? user?.Id : userId),
		[isMyProfile, userId, user]
	)

	const { data: following, isLoading } = useQuery({
		queryKey: [isFollowing ? 'following' : 'followers', { user: userId }],
		queryFn: isFollowing
			? () => FriendshipsService.GetFollowing(profileUserId!)
			: () => FriendshipsService.GetFollowers(profileUserId!),
	})

	return (
		<Modal
			onClose={onClose}
			minWidth={400}
			height={windowHeight - 100}
			width='auto'
			aspectRatio={2 / 1}
			rounded={true}
		>
			<div className='w-full h-full flex flex-col'>
				<ModalHeader
					title={isFollowing ? 'Following' : 'Followers'}
					onClose={onClose}
				/>
				<div className='flex-1 px-4'>
					<If condition={following?.length === 0}>
						<div className='flex-center flex-col w-full h-full'>
							<PeoplesIcon />
							<div className='text-xxl font-light pt-4 pb-1'>
								{isFollowing ? 'Following' : 'Followers'}
							</div>
							<div className='text-sm'>
								You'll see all the people who{' '}
								{isFollowing ? 'you follow' : 'follow you'} here.
							</div>
						</div>
					</If>
					{isLoading ? (
						<Spinner full />
					) : (
						following?.map((user) => (
							<FollowingFollowerItem
								user={user}
								key={user.Id}
								isFollowing={isFollowing}
								onClose={onClose}
							/>
						))
					)}
				</div>
			</div>
		</Modal>
	)
}

export default memo(FollowingFollowersModal)
