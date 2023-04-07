import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '@components/common/avatar/Avatar'
import Button from '@components/common/button/Button'
import If from '@components/common/if/If'
import UserMiniatureModel from '@api/common/models/user/UserMiniatureModel'
import UserStatsModel from '@api/common/models/user/UserStatsModel'
import { UnfollowUserAsync } from '@api/services/friendships/FriendshipsService'

type PropsType = {
	user: UserMiniatureModel
	isFollowing: boolean
	onClose: () => void
	isMyProfile: boolean
}

const FollowingItem = (props: PropsType) => {
	const { user, isFollowing, onClose, isMyProfile } = props

	const navigate = useNavigate()

	const qc = useQueryClient()
	const unfollowMutation = useMutation({ mutationFn: (id: string) => UnfollowUserAsync(id), onSuccess: async () => {
		const following = await qc.fetchQuery<UserMiniatureModel[]>(['following'])
		qc.setQueryData<UserStatsModel>(['stats'], (prev) => {
			return { ...prev, FollowersCount: following.length } as UserStatsModel
		})
	} })

	const goToProfile = (userId: string) => {
		onClose()
		navigate(`/profile/${userId}/posts`)
	}

	const onClickUnfollow = (e: React.MouseEvent) => {
		e.stopPropagation()
		unfollowMutation.mutate(user.Id)
	}

	return (
		<div
			className='my-4 flex cursor-pointer items-center'
			onClick={() => goToProfile(user.Id)}
		>
			<Avatar src={user.Avatar} size='medium' />
			<span className='text-dark w-full overflow-hidden px-3 font-semibold'>
				{user.Nickname}
			</span>
			<If condition={isFollowing && isMyProfile}>
				<Button
					isLoading={unfollowMutation.isLoading}
					onClick={onClickUnfollow}
					theme='secondary'
				>
					Unfollow
				</Button>
			</If>
		</div>
	)
}

export default memo(FollowingItem)
