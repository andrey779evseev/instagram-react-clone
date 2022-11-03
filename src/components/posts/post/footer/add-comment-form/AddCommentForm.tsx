import { useMutation, useQueryClient } from '@tanstack/react-query'
import { KeyboardEvent, memo, useMemo, useState } from 'react'
import SmileEmojiIcon from '@components/common/assets/icons/SmileEmojiIcon'
import LittleLoading from '@components/common/little-loading/LittleLoading'
import { PostService } from '@api/services/post/PostService'
import s from './AddCommentForm.module.scss'

type PropsType = {
	postId: string | undefined
}

const AddCommentForm = (props: PropsType) => {
	const { postId } = props
	const [commentText, setCommentText] = useState('')
	const isAvailablePost = useMemo(() => commentText !== '', [commentText])

	const qc = useQueryClient()
	const addCommentMutation = useMutation(PostService.AddComment, {
		onSuccess: () => {
			setCommentText('')
			qc.invalidateQueries(['comments', { post: postId }])
			qc.invalidateQueries(['mini-posts'])
		},
	})

	const onKeyUp = (e: KeyboardEvent) => {
		if (e.code === 'Enter') addComment()
	}

	const addComment = () => {
		addCommentMutation.mutate({
			PostId: postId!,
			Text: commentText,
		})
	}

	return (
		<div className={s.add_comment_container} onKeyUp={onKeyUp}>
			<SmileEmojiIcon className='cursor-pointer' />
			<input
				type='text'
				className={s.add_comment_input}
				placeholder='Add a comment...'
				value={commentText}
				onChange={(e) => setCommentText(e.target.value)}
			/>
			<div
				className={`${s.post_btn} ${!isAvailablePost && s.disabled}`}
				onClick={addComment}
			>
				{addCommentMutation.isLoading ? (
					<LittleLoading color='cobalt' />
				) : (
					'Post'
				)}
			</div>
		</div>
	)
}

export default memo(AddCommentForm)
