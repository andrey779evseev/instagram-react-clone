import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import PeoplesIcon from '@components/common/assets/icons/PeoplesIcon'
import If from '@components/common/if/If'
import Modal from '@components/common/modal/Modal'
import ModalHeader from '@components/common/modal/header/ModalHeader'
import Spinner from '@components/common/spinner/Spinner'
import useWindowSize from '@hooks/UseWindowSize'
import { FriendshipsService } from '@api/services/friendships/FriendshipsService'
import FollowingFollowerItem from './FollowingFollowerItem'

type PropsType = {
	onClose: () => void
	isFollowing: boolean
}

const FollowingModal = (props: PropsType) => {
	const { onClose, isFollowing } = props

	const { windowHeight } = useWindowSize()

	const { data: following, isLoading } = useQuery({
		queryKey: [isFollowing ? 'following' : 'followers'],
		queryFn: isFollowing
			? FriendshipsService.GetFollowing
			: FriendshipsService.GetFollowers,
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
							/>
						))
					)}
				</div>
			</div>
		</Modal>
	)
}

export default memo(FollowingModal)
