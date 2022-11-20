import { memo, useMemo } from 'react'
import { useParams } from 'react-router'
import PeoplesIcon from '@components/common/assets/icons/PeoplesIcon'
import If from '@components/common/if/If'
import Modal from '@components/common/modal/Modal'
import ModalHeader from '@components/common/modal/header/ModalHeader'
import Spinner from '@components/common/spinner/Spinner'
import useWindowSize from '@hooks/UseWindowSize'
import {
	useUserFollowersQuery,
	useUserFollowingQuery,
} from '@api/services/friendships/FriendshipsService'
import { useCurrentUserQuery } from '@api/services/user/UserService'
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

	const { data: user } = useCurrentUserQuery(isMyProfile)

	const profileUserId = useMemo(
		() => (isMyProfile ? user?.Id : userId),
		[isMyProfile, userId, user]
	)

	const { data: following, isLoading } = isFollowing
		? useUserFollowingQuery(profileUserId!)
		: useUserFollowersQuery(profileUserId!)

	return (
		<Modal
			onClose={onClose}
			minWidth={400}
			height={windowHeight - 100}
			width='auto'
			aspectRatio={2 / 1}
			rounded={true}
		>
			<div className='flex h-full w-full flex-col'>
				<ModalHeader
					title={isFollowing ? 'Following' : 'Followers'}
					onClose={onClose}
				/>
				<div className='flex-1 px-4'>
					<If condition={following?.length === 0}>
						<div className='flex-center h-full w-full flex-col'>
							<PeoplesIcon />
							<div className='text-xxl pt-4 pb-1 font-light'>
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
								isMyProfile={isMyProfile}
							/>
						))
					)}
				</div>
			</div>
		</Modal>
	)
}

export default memo(FollowingFollowersModal)
