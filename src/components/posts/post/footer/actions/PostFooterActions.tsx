import { useMutation, useQueryClient } from '@tanstack/react-query'
import { memo, useEffect, useState } from 'react'
import BookmarkIcon from '@components/common/assets/icons/BookmarkIcon'
import CommentIcon from '@components/common/assets/icons/CommentIcon'
import PlaneIcon from '@components/common/assets/icons/PlaneIcon'
import LikeButton from '@components/common/like-button/LikeButton'
import LikesInfoModel from '@api/common/models/responses/LikesInfoModel'
import { LikesService } from '@api/services/likes/LikesService'
import s from './PostFooterActions.module.scss'

type PropsType = {
	postId: string | undefined
	liked: boolean | undefined
}

const PostFooterActions = (props: PropsType) => {
	const { postId, liked = false } = props
	const [isLiked, setIsLiked] = useState(liked)

	const qc = useQueryClient()
	const likeMutation = useMutation(LikesService.LikePost, {
		onSuccess: () => {
			invalidateMiniPosts()
		},
	})
	const unlikeMutation = useMutation(LikesService.UnlikePost, {
		onSuccess: () => {
			invalidateMiniPosts()
		},
	})

	useEffect(() => {
		setIsLiked(liked)
	}, [liked])

	const invalidateMiniPosts = () => {
		qc.invalidateQueries(['mini-posts'])
	}

	const onLike = () => {
		if (isLiked) unlikeMutation.mutate(postId!)
		else likeMutation.mutate(postId!)

		qc.setQueryData<LikesInfoModel>(
			['likes-info', { post: postId }],
			(prev) => {
				return {
					...prev,
					Liked: !isLiked,
					LikesCount: !isLiked ? prev!.LikesCount + 1 : prev!.LikesCount - 1,
				} as LikesInfoModel
			}
		)

		setIsLiked(!isLiked)
	}

	return (
		<div className='flex justify-between items-center'>
			<div className='flex items-center'>
				<div className={s.post_action_btn_icon}>
					<LikeButton onClick={onLike} isLiked={isLiked} />
				</div>
				<CommentIcon className={s.post_action_btn_icon} />
				<PlaneIcon className={s.post_action_btn_icon} />
			</div>
			<BookmarkIcon className={s.post_action_btn_icon} />
		</div>
	)
}

export default memo(PostFooterActions)
