import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query'
import { KeyboardEvent, memo, useMemo, useState } from 'react'
import SmileEmojiIcon from '@components/common/assets/icons/SmileEmojiIcon'
import LittleLoading from '@components/common/little-loading/LittleLoading'
import { CommentsService } from '@api/services/comments/CommentsService'
import s from './AddCommentForm.module.scss'
import { useMatch } from 'react-router-dom'
import PostMiniatureModel from '@api/common/models/post/PostMiniatureModel'

type PropsType = {
	postId: string | undefined
}

const AddCommentForm = (props: PropsType) => {
	const { postId } = props
	const [commentText, setCommentText] = useState('')
	const isAvailablePost = useMemo(() => commentText !== '', [commentText])
	const match = useMatch('/profile/:userId/posts')
	const qc = useQueryClient()
	const addCommentMutation = useMutation(CommentsService.AddComment, {
		onSuccess: () => {
			setCommentText('')
			qc.invalidateQueries(['comments', { post: postId }])
			qc.invalidateQueries(['comments-count', { post: postId }])
			qc.invalidateQueries(['first-comment', { post: postId }])
			if(match !== null) {
				qc.setQueryData<InfiniteData<PostMiniatureModel[]>>(
					['mini-posts', {user: match.params.userId}],
					(prev) => {
						const data: InfiniteData<PostMiniatureModel[]> = JSON.parse(JSON.stringify(prev))
						for (let i = 0; i < data.pages.length; i++) {
							for (let j = 0; j < data.pages[i].length; j++) {
								const item = data.pages[i][j]
								if(item.Id === postId)
									item.CommentsCount += 1
							}
						}
						return data
					}
				)
			}
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
