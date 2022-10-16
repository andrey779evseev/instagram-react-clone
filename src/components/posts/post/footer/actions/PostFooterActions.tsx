import { useState } from 'react'
import BookmarkIcon from '@components/common/assets/icons/BookmarkIcon'
import CommentIcon from '@components/common/assets/icons/CommentIcon'
import PlaneIcon from '@components/common/assets/icons/PlaneIcon'
import LikeButton from '@components/common/like-button/LikeButton'
import s from './PostFooterActions.module.scss'

const PostFooterActions = () => {
	const [isLiked, setIsLiked] = useState(false)
	return (
		<div className='flex justify-between items-center'>
			<div className='flex items-center'>
				<div className={s.post_action_btn_icon}>
					<LikeButton onClick={() => setIsLiked(!isLiked)} isLiked={isLiked} />
				</div>
				<CommentIcon className={s.post_action_btn_icon} />
				<PlaneIcon className={s.post_action_btn_icon} />
			</div>
			<BookmarkIcon className={s.post_action_btn_icon} />
		</div>
	)
}

export default PostFooterActions
