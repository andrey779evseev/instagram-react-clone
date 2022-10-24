import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { memo, useEffect, useState } from 'react'
import BookmarkIcon from '@components/common/assets/icons/BookmarkIcon'
import CommentIcon from '@components/common/assets/icons/CommentIcon'
import PlaneIcon from '@components/common/assets/icons/PlaneIcon'
import LikeButton from '@components/common/like-button/LikeButton'
import PostDetailModel from '@api/common/models/responses/PostDetailModel'
import { AccountService } from '@api/services/account/AccountService'
import { PostService } from '@api/services/post/PostService'
import s from './PostFooterActions.module.scss'

type PropsType = {
	postId: string | undefined
	liked: boolean | undefined
}

const PostFooterActions = (props: PropsType) => {
	const { postId, liked = false } = props
	const [isLiked, setIsLiked] = useState(liked)

	const qc = useQueryClient()
	const { data: user } = useQuery(['user'], AccountService.GetUser)
	const likeMutation = useMutation(PostService.LikePost, {
		onSuccess: () => {
			qc.invalidateQueries(['mini-posts', user?.Id])
		},
	})
	const unlikeMutation = useMutation(PostService.UnlikePost, {
		onSuccess: () => {
			qc.invalidateQueries(['mini-posts', user?.Id])
		},
	})

	useEffect(() => {
		setIsLiked(liked)
	}, [liked])

	const onLike = () => {
		if (isLiked) unlikeMutation.mutate({ PostId: postId! })
		else likeMutation.mutate({ PostId: postId! })

		qc.setQueryData<PostDetailModel>(['post', postId], (prev) => {
			prev!.LikesInfo.Liked = !isLiked
			return prev
		})

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
