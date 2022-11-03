import { useQuery } from '@tanstack/react-query'
import { memo, useMemo } from 'react'
import If from '@components/common/if/If'
import Skeleton from '@components/common/skeleton/Skeleton'
import SkeletonWrapper from '@components/common/skeleton/SkeletonWrapper'
import addDotsToNumber from '@utils/AddDotsToNumber'
import { fromDateToNow } from '@utils/date/FromDateToNow'
import PostModel from '@api/common/models/responses/PostModel'
import { PostService } from '@api/services/post/PostService'
import PostFooterActions from './actions/PostFooterActions'
import AddCommentForm from './add-comment-form/AddCommentForm'
import PostFooterDescription from './description/PostFooterDescription'

type PropsType = {
	post: PostModel
	authorName: string | undefined
}

const PostFooter = (props: PropsType) => {
	const { post, authorName } = props

	const { data: likesInfo, isLoading: isLoadingLikes } = useQuery({
		queryKey: ['likes', { post: post.Id }],
		queryFn: () => PostService.GetLikesInfo(post.Id),
	})
	const { data: commentsCount, isLoading: isLoadingCommentsCount } = useQuery({
		queryKey: ['comments-count', { post: post.Id }],
		queryFn: () => PostService.GetCommentsCount(post.Id),
	})

	const likesCount = useMemo(
		() => (!isLoadingLikes ? addDotsToNumber(likesInfo!.LikesCount) : 0),
		[likesInfo]
	)

	return (
		<div className='border-gray20 border border-t-0'>
			<div className='p-4'>
				<PostFooterActions postId={post.Id} liked={likesInfo?.Liked} />
				<div className='font-bold mt-4'>
					<SkeletonWrapper
						condition={isLoadingLikes}
						skeleton={<Skeleton variant='text' />}
					>
						{likesCount} likes
					</SkeletonWrapper>
				</div>
				<PostFooterDescription
					description={post.Description}
					authorName={authorName}
				/>
				<If condition={isLoadingCommentsCount || commentsCount !== 0}>
					<SkeletonWrapper
						condition={isLoadingCommentsCount}
						skeleton={<Skeleton variant='text' />}
						className='mt-1'
					>
						<div className='text-gray50 cursor-pointer'>
							View all {commentsCount} comments
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
