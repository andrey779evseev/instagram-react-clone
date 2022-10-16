import { memo } from 'react'
import LikeFilledIcon from '../assets/icons/LikeFilledIcon'
import LikeIcon from '../assets/icons/LikeIcon'

type PropsType = {
	onClick?: () => void
	isLiked?: boolean
}

const LikeButton = (props: PropsType) => {
	const { onClick, isLiked = false } = props

	return (
		<div onClick={onClick}>
			{isLiked ? <LikeFilledIcon className='animate-buble' /> : <LikeIcon />}
		</div>
	)
}

export default memo(LikeButton)
