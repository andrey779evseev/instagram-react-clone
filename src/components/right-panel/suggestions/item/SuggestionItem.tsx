import { useMutation, useQueryClient } from '@tanstack/react-query'
import { memo } from 'react'
import Avatar from '@components/common/avatar/Avatar'
import Button from '@components/common/button/Button'
import LittleLoading from '@components/common/little-loading/LittleLoading'
import UserMiniatureModel from '@api/common/models/user/UserMiniatureModel'
import { FollowUserAsync } from '@api/services/friendships/FriendshipsService'
import { EnumAvatarSize } from '@models/enums/EnumAvatarSize'

type PropsType = {
	suggestion: UserMiniatureModel
	isSmall?: boolean
}

const SuggestionItem = (props: PropsType) => {
	const { suggestion, isSmall = true } = props

	const qc = useQueryClient()
	const followMutation = useMutation({ mutationFn: (id: string) => FollowUserAsync(id), onSuccess: () => {
		qc.invalidateQueries(['suggestions'])
		qc.invalidateQueries(['feed'])
	} })

	return (
		<div className={`flex items-center ${isSmall ? 'my-2' : 'my-4'}`}>
			<Avatar src={suggestion.Avatar} size={EnumAvatarSize.Medium} />
			<div className='items-between flex w-full flex-col overflow-hidden px-3'>
				<span className='text-dark font-semibold'>{suggestion.Nickname}</span>
				<div className='text-gray50 overflow-hidden text-ellipsis whitespace-nowrap text-xs'>
					Popular
				</div>
			</div>
			{isSmall ? (
				<span
					className='text-cobalt mt-px cursor-pointer text-xs font-semibold'
					onClick={() => followMutation.mutate(suggestion.Id)}
				>
					{followMutation.isLoading ? (
						<LittleLoading color='cobalt' />
					) : (
						'Follow'
					)}
				</span>
			) : (
				<Button
					isLoading={followMutation.isLoading}
					onClick={() => followMutation.mutate(suggestion.Id)}
				>
					Follow
				</Button>
			)}
		</div>
	)
}

export default memo(SuggestionItem)
