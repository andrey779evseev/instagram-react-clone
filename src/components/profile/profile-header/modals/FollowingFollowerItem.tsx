import { useMutation, useQueryClient } from '@tanstack/react-query'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar, { EnumAvatarSize } from '@components/common/avatar/Avatar'
import Button, { EnumButtonTheme } from '@components/common/button/Button'
import If from '@components/common/if/If'
import UserMiniatureModel from '@api/common/models/responses/UserMiniatureModel'
import UserStatsModel from '@api/common/models/responses/UserStatsModel'
import { FriendshipsService } from '@api/services/friendships/FriendshipsService'

type PropsType = {
	user: UserMiniatureModel
	isFollowing: boolean
	onClose: () => void
}

const FollowingItem = (props: PropsType) => {
	const { user, isFollowing, onClose } = props

	const navigate = useNavigate()

	const qc = useQueryClient()
	const unfollowMutation = useMutation(
		(id: string) => FriendshipsService.Unfollow(id),
		{
			onSuccess: async () => {
				const following = await qc.fetchQuery<UserMiniatureModel[]>([
					'following',
				])
				qc.setQueryData<UserStatsModel>(['stats'], (prev) => {
					return { ...prev, FollowersCount: following.length } as UserStatsModel
				})
			},
		}
	)

	const goToProfile = (userId: string) => {
		onClose()
		navigate(`/profile/${userId}/posts`)
	}

	return (
		<div
			className='flex items-center my-4 cursor-pointer'
			onClick={() => goToProfile(user.Id)}
		>
			<Avatar src={user.Avatar} size={EnumAvatarSize.Medium} />
			<span className='text-dark font-semibold w-full px-3 overflow-hidden'>
				{user.Nickname}
			</span>
			<If condition={isFollowing}>
				<Button
					isLoading={unfollowMutation.isLoading}
					onClick={() => unfollowMutation.mutate(user.Id)}
					theme={EnumButtonTheme.Secondary}
				>
					Unfollow
				</Button>
			</If>
		</div>
	)
}

export default memo(FollowingItem)
