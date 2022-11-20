import { memo } from 'react'
import ImageBox from '@components/common/image-box/ImageBox'
import MoreButton from '@components/common/more-button/MoreButton'
import Skeleton from '@components/common/skeleton/Skeleton'
import SkeletonWrapper from '@components/common/skeleton/SkeletonWrapper'

type PropsType = {
	authorAvatar: string | undefined
	authorName: string | undefined
	isLoading: boolean
}

const PostHeader = (props: PropsType) => {
	const { authorAvatar, authorName, isLoading } = props
	return (
		<div className='flex w-full items-center justify-between rounded-t-lg bg-white px-4 py-[9px]'>
			<div className='flex items-center'>
				<ImageBox image={authorAvatar} isSmall={true} isLoading={isLoading} />
				<SkeletonWrapper
					condition={isLoading}
					skeleton={<Skeleton variant='text' />}
					className='ml-4'
				>
					<span className='font-semibold'>{authorName}</span>
				</SkeletonWrapper>
			</div>
			<MoreButton />
		</div>
	)
}

export default memo(PostHeader)
