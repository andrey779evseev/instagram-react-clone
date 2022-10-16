import { useMemo, useState } from 'react'
import EmojiIcon from '@components/common/assets/icons/EmojiIcon'
import s from './AddCommentForm.module.scss'

const AddCommentForm = () => {
	const [commentText, setCommentText] = useState('')
	const isAvaliablePost = useMemo(() => commentText !== '', [commentText])
	return (
		<div className={s.add_comment_container}>
			<EmojiIcon className='cursor-pointer' />
			<input
				type='text'
				className={s.add_comment_input}
				placeholder='Add a comment...'
				value={commentText}
				onChange={(e) => setCommentText(e.target.value)}
			/>
			<div className={`${s.post_btn} ${!isAvaliablePost && s.disabled}`}>
				Post
			</div>
		</div>
	)
}

export default AddCommentForm
