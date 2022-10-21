import { useMemo, useState } from 'react'
import SmileEmojiIcon from '@components/common/assets/icons/SmileEmojiIcon'
import s from './AddCommentForm.module.scss'

const AddCommentForm = () => {
	const [commentText, setCommentText] = useState('')
	const isAvailablePost = useMemo(() => commentText !== '', [commentText])
	return (
		<div className={s.add_comment_container}>
			<SmileEmojiIcon className='cursor-pointer' />
			<input
				type='text'
				className={s.add_comment_input}
				placeholder='Add a comment...'
				value={commentText}
				onChange={(e) => setCommentText(e.target.value)}
			/>
			<div className={`${s.post_btn} ${!isAvailablePost && s.disabled}`}>
				Post
			</div>
		</div>
	)
}

export default AddCommentForm
