import Skeleton from '@components/common/skeleton/Skeleton'
import SkeletonWrapper from '@components/common/skeleton/SkeletonWrapper'
import PostFooterActions from '@components/posts/post/footer/actions/PostFooterActions'
import LikesInfo from '@components/posts/post/footer/likes-info/LikesInfo'
import { formatDate } from '@utils/date/FormatDate'
import LikesInfoModel from '@api/common/models/responses/LikesInfoModel'

type PropsType = {
	isLoading: boolean
	postedAt: string | undefined
	likesInfo: LikesInfoModel | undefined
	postId: string | undefined
}

const DetailPostFooter = (props: PropsType) => {
	const { isLoading, postedAt, likesInfo, postId } = props
	return (
		<div className='border-t-gray10 mt-auto border-t p-4'>
			<PostFooterActions postId={postId} liked={likesInfo?.Liked} />
			<SkeletonWrapper
				condition={isLoading}
				skeleton={<Skeleton variant='text' width='50%' />}
				className='mt-4'
			>
				<LikesInfo
					images={likesInfo?.Avatars}
					count={likesInfo?.LikesCount ?? 0}
					firstName={likesInfo?.FirstName}
				/>
			</SkeletonWrapper>
			<div className='text-gray50 text-s uppercase'>
				<SkeletonWrapper
					condition={isLoading}
					skeleton={<Skeleton variant='text' width='40%' />}
				>
					{formatDate(postedAt, 'MMMM D, YYYY')}
				</SkeletonWrapper>
			</div>
		</div>
	)
}

export default DetailPostFooter
