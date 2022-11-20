import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Avatar from '@components/common/avatar/Avatar'
import If from '@components/common/if/If'
import Skeleton from '@components/common/skeleton/Skeleton'
import SkeletonWrapper from '@components/common/skeleton/SkeletonWrapper'
import {
	useCurrentUserQuery,
	useUserQuery,
} from '@api/services/user/UserService'
import { EnumAvatarSize } from '@models/enums/EnumAvatarSize'
import ProfileHeaderStats from './ProfileHeaderStats'
import FollowingFollowersModal from './modals/FollowingFollowersModal'

const ProfileHeader = () => {
	const [isFollowingModal, setIsFollowingModal] = useState(false)
	const [isFollowersModal, setIsFollowersModal] = useState(false)
	const { userId } = useParams()

	const { data: user, isLoading } =
		userId === 'me' ? useCurrentUserQuery() : useUserQuery(userId!)

	return (
		<div className='flex justify-center'>
			<div className='flex items-center'>
				<SkeletonWrapper
					skeleton={<Skeleton variant='circular' width={150} height={150} />}
					condition={isLoading}
				>
					<Avatar src={user?.Avatar} size={EnumAvatarSize.ExtraLarge} />
				</SkeletonWrapper>
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
