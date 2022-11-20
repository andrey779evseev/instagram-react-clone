import { memo, useMemo } from 'react'
import Modal from '@components/common/modal/Modal'
import Skeleton from '@components/common/skeleton/Skeleton'
import SkeletonWrapper from '@components/common/skeleton/SkeletonWrapper'
import useWindowSize from '@hooks/UseWindowSize'
import CommentModel from '@api/common/models/comment/CommentModel'
import { usePostCommentsQuery } from '@api/services/comments/CommentsService'
import { usePostLikesInfoQuery } from '@api/services/likes/LikesService'
import {
	usePostAuthorQuery,
	usePostQuery,
} from '@api/services/post/PostService'
import AddCommentForm from '../post/footer/add-comment-form/AddCommentForm'
import PostCommentsList from './comments/PostCommentsList'
import PostModalFooter from './footer/PostModalFooter'
import DetailPostHeader from './header/DetailPostHeader'

type PropsType = {
	postId: string
	onClose: () => void
}

const PostModal = (props: PropsType) => {
	const { postId, onClose } = props

	const { windowWidth, windowHeight } = useWindowSize()

	const { data: post, isLoading: isLoadingPost } = usePostQuery(postId)
	const { data: author, isLoading: isLoadingAuthor } =
		usePostAuthorQuery(postId)
	const { data: likesInfo, isLoading: isLoadingLikesInfo } =
		usePostLikesInfoQuery(postId)
	const { data: commentsData, isLoading: isLoadingComments } =
		usePostCommentsQuery(postId)

	const isLoading = useMemo(
		() =>
			isLoadingPost ||
			isLoadingComments ||
			isLoadingLikesInfo ||
			isLoadingAuthor,
		[isLoadingPost, isLoadingComments, isLoadingAuthor, isLoadingLikesInfo]
	)

	const comments = useMemo(() => {
		if (isLoading) return []
		return [
			{
				Text: post?.Description,
				Author: author,
				CommentedAt: post?.PostedAt,
				PostId: postId,
				CommentId: '',
			},
			...commentsData!,
		] as CommentModel[]
	}, [commentsData, post, isLoading])

	const width = useMemo(() => {
		return windowWidth > 1200 && windowWidth < 1600
			? 800
			: Math.min(windowWidth - 48, 1000)
	}, [windowWidth])

	const height = useMemo(() => {
		return windowWidth > 1200 && windowWidth < 1600
			? 500
			: Math.min(windowHeight - 48, 600)
	}, [windowHeight])

	return (
		<Modal
			width={width}
			height={height}
			aspectRatio={2.2 / 1}
			onClose={onClose}
		>
			<div className='w-1/2'>
				<SkeletonWrapper
					condition={isLoading}
					skeleton={
						<Skeleton height='100%' width='100%' variant='rectangular' />
					}
					full
				>
					<div
						className='bg-image-contain h-full w-full bg-black'
						style={{ backgroundImage: `url('${post?.Photo}')` }}
					/>
				</SkeletonWrapper>
			</div>
			<div className='flex h-full w-1/2 flex-col justify-between'>
				<DetailPostHeader
					isLoading={isLoading}
					nickname={author?.Nickname}
					avatar={author?.Avatar}
				/>
				<PostCommentsList comments={comments} isLoading={isLoading} />
				<PostModalFooter
					postId={post?.Id}
					postedAt={post?.PostedAt}
					isLoading={isLoading}
					likesInfo={likesInfo}
				/>
				<AddCommentForm postId={post?.Id} />
			</div>
		</Modal>
	)
}

export default memo(PostModal)
