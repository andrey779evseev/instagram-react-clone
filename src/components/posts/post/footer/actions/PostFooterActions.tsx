import {
	InfiniteData,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query'
import { memo, useEffect, useState } from 'react'
import { useMatch } from 'react-router-dom'
import BookmarkIcon from '@components/common/assets/icons/BookmarkIcon'
import CommentIcon from '@components/common/assets/icons/CommentIcon'
import PlaneIcon from '@components/common/assets/icons/PlaneIcon'
import LikeButton from '@components/common/like-button/LikeButton'
import LikesInfoModel from '@api/common/models/like/LikesInfoModel'
import PostMiniatureModel from '@api/common/models/post/PostMiniatureModel'
import {
	LikePostAsync,
	UnlikePostAsync,
} from '@api/services/likes/LikesService'
import s from './PostFooterActions.module.scss'
import If from '@components/common/if/If'

type PropsType = {
	postId: string | undefined
	liked: boolean | undefined
	setVisibleModal?: (value: boolean) => void
	isHideCommentBtn?: boolean
}

const PostFooterActions = (props: PropsType) => {
	const {
		postId,
		liked = false,
		setVisibleModal = undefined,
		isHideCommentBtn = false,
	} = props
	const [isLiked, setIsLiked] = useState(liked)
	const match = useMatch('/profile/:userId/posts')
	const qc = useQueryClient()
	const likeMutation = useMutation({ mutationFn: LikePostAsync, onSuccess: () => {
		invalidateMiniPosts(true)
	} })
	const unlikeMutation = useMutation({ mutationFn: UnlikePostAsync, onSuccess: () => {
		invalidateMiniPosts(false)
	} })

	useEffect(() => {
		setIsLiked(liked)
	}, [liked])

	const invalidateMiniPosts = (isLiked: boolean) => {
		if (match !== null) {
			qc.setQueryData<InfiniteData<PostMiniatureModel[]>>(
				['mini-posts', { user: match.params.userId }],
				(prev) => {
					const data: InfiniteData<PostMiniatureModel[]> = JSON.parse(
						JSON.stringify(prev)
					)
					for (let i = 0; i < data.pages.length; i++) {
						for (let j = 0; j < data.pages[i].length; j++) {
							const item = data.pages[i][j]
							if (item.Id === postId)
								item.LikesCount = isLiked
									? item.LikesCount + 1
									: item.LikesCount - 1
						}
					}
					return data
				}
			)
		}
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
		<div className='flex items-center justify-between'>
			<div className='flex items-center'>
				<div className={s.post_action_btn_icon}>
					<LikeButton onClick={onLike} isLiked={isLiked} />
				</div>
				<If condition={!isHideCommentBtn}>
					<div
						onClick={() => setVisibleModal!(true)}
						className={s.post_action_btn_icon}
					>
						<CommentIcon />
					</div>
				</If>
				<PlaneIcon className={s.post_action_btn_icon} />
			</div>
			<BookmarkIcon className={s.post_action_btn_icon} />
		</div>
	)
}

export default memo(PostFooterActions)
