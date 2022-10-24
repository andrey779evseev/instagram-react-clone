import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { memo, useEffect, useMemo, useState } from 'react'
import SmileEmojiIcon from '@components/common/assets/icons/SmileEmojiIcon'
import LittleLoading from '@components/common/little-loading/LittleLoading'
import useKeyPress from '@hooks/UseKeyPress'
import { AccountService } from '@api/services/account/AccountService'
import { PostService } from '@api/services/post/PostService'
import s from './AddCommentForm.module.scss'

type PropsType = {
	postId: string | undefined
}

const AddCommentForm = (props: PropsType) => {
	const { postId } = props
	const [commentText, setCommentText] = useState('')
	const isAvailablePost = useMemo(() => commentText !== '', [commentText])
	const enterPressed = useKeyPress('Enter', true)

	useEffect(() => {
		if (enterPressed) addComment()
	}, [enterPressed])

	const qc = useQueryClient()
	const { data: user } = useQuery(['user'], AccountService.GetUser)
	const addCommentMutation = useMutation(PostService.AddComment, {
		onSuccess: () => {
			setCommentText('')
			qc.invalidateQueries(['comments', postId])
			qc.invalidateQueries(['mini-posts', user?.Id])
		},
	})

	const addComment = () => {
		addCommentMutation.mutate({
			PostId: postId!,
			Text: commentText,
		})
	}

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
