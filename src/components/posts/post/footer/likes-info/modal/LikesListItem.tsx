import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '@components/common/avatar/Avatar'
import LikeModel from '@api/common/models/like/LikeModel'

type PropsType = {
	like: LikeModel
	onClose: () => void
}

const LikesListItem = (props: PropsType) => {
	const { like, onClose } = props
	const navigate = useNavigate()

	const goToProfile = (userId: string) => {
		onClose()
		navigate(`/profile/${userId}/posts`)
	}

	return (
		<div
			className='flex cursor-pointer items-center'
			onClick={() => goToProfile(like.User.Id)}
		>
			<Avatar src={like.User.Avatar} size='medium' />
			<div className='ml-2 flex flex-col justify-between'>
				<div className='font-semibold'>{like.User.Nickname}</div>
				<div className='text-gray50'>{like.User.Name}</div>
			</div>
		</div>
	)
}

export default memo(LikesListItem)
