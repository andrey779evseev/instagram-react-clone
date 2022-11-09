import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import If from '@components/common/if/If'
import Skeleton from '@components/common/skeleton/Skeleton'
import SkeletonWrapper from '@components/common/skeleton/SkeletonWrapper'
import { fromDateToNow } from '@utils/date/FromDateToNow'
import PostModel from '@api/common/models/responses/PostModel'
import { CommentsService } from '@api/services/comments/CommentsService'
import { LikesService } from '@api/services/likes/LikesService'
import PostFooterActions from './actions/PostFooterActions'
import AddCommentForm from './add-comment-form/AddCommentForm'
import PostFooterDescription from './description/PostFooterDescription'
import LikesInfo from './likes-info/LikesInfo'

type PropsType = {
	post: PostModel
	authorName: string | undefined
	setVisibleModal: (value: boolean) => void
}

const PostFooter = (props: PropsType) => {
	const { post, authorName, setVisibleModal } = props

	const { data: likesInfo, isLoading: isLoadingLikes } = useQuery({
		queryKey: ['likes-info', { post: post.Id }],
		queryFn: () => LikesService.GetLikesInfo(post.Id),
	})
	const { data: commentsCount, isLoading: isLoadingCommentsCount } = useQuery({
		queryKey: ['comments-count', { post: post.Id }],
		queryFn: () => CommentsService.GetCommentsCount(post.Id),
	})
	const { data: firstComment, isLoading: isLoadingFirstComment } = useQuery({
		queryKey: ['first-comment', { post: post.Id }],
		queryFn: () => CommentsService.GetFirstComment(post.Id),
	})

	return (
		<div className='border-gray20 border border-t-0'>
			<div className='p-4'>
				<PostFooterActions postId={post.Id} liked={likesInfo?.Liked} />
				<div className='font-bold mt-4'>
					<SkeletonWrapper
						condition={isLoadingLikes}
						skeleton={<Skeleton variant='text' />}
					>
						<LikesInfo
							images={likesInfo?.Avatars}
							count={likesInfo?.LikesCount ?? 0}
							firstName={likesInfo?.FirstName}
							postId={post.Id}
						/>
					</SkeletonWrapper>
				</div>
				<PostFooterDescription
					description={post.Description}
					authorName={authorName}
					setVisibleModal={setVisibleModal}
				/>
				<If condition={isLoadingCommentsCount || commentsCount !== 0}>
					<SkeletonWrapper
						condition={isLoadingCommentsCount}
						skeleton={<Skeleton variant='text' />}
						className='mt-1'
					>
						<div
							className='text-gray50 cursor-pointer'
							onClick={() => setVisibleModal(true)}
						>
							View all {commentsCount} comments
						</div>
					</SkeletonWrapper>
				</If>
				<If condition={!!firstComment}>
					<SkeletonWrapper
						condition={isLoadingFirstComment}
						skeleton={<Skeleton variant='text' />}
						className='mt-1'
					>
						<div className='flex items-center'>
							<div className='author_name font-semibold'>
								{firstComment?.AuthorName}
							</div>
							<div className='ml-2 w-full whitespace-nowrap overflow-hidden text-ellipsis'>
								{firstComment?.Text}
							</div>
						</div>
					</SkeletonWrapper>
				</If>
				<div className='text-s text-gray50 uppercase mt-1'>
					{fromDateToNow(post.PostedAt)}
				</div>
			</div>
			<AddCommentForm postId={post.Id} />
		</div>
	)
}

export default memo(PostFooter)
