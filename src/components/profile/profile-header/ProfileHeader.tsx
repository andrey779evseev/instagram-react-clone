import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Avatar, { EnumAvatarSize } from '@components/common/avatar/Avatar'
import If from '@components/common/if/If'
import { UserService } from '@api/services/user/UserService'
import ProfileHeaderStats from './ProfileHeaderStats'
import FollowingFollowersModal from './modals/FollowingFollowersModal'

const ProfileHeader = () => {
	const [isFollowingModal, setIsFollowingModal] = useState(false)
	const [isFollowersModal, setIsFollowersModal] = useState(false)
	const { userId } = useParams()

	// prettier-ignore
	const { data: user } =
		userId === 'me'
			? useQuery({
				queryKey: ['user'],
				queryFn: UserService.GetCurrentUser,
			})
			: useQuery({
				queryKey: ['user', { id: userId }],
				queryFn: () => UserService.GetUser(userId!),
			})

	return (
		<div className='flex justify-center'>
			<div className='flex items-center'>
				<Avatar src={user?.Avatar} size={EnumAvatarSize.ExtraLarge} />
				<ProfileHeaderStats
					setIsFollowersModal={setIsFollowersModal}
					setIsFollowingModal={setIsFollowingModal}
					user={user}
				/>
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
