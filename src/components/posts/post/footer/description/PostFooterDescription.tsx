import Skeleton from '@components/common/skeleton/Skeleton'
import SkeletonWrapper from '@components/common/skeleton/SkeletonWrapper'

type PropsType = {
	description: string
	authorName: string | undefined
	setVisibleModal: (value: boolean) => void
}

const PostFooterDescription = (props: PropsType) => {
	const { description, authorName, setVisibleModal } = props

	return (
		<div className='flex items-center'>
			<SkeletonWrapper
				condition={!authorName}
				skeleton={<Skeleton variant='text' />}
			>
				<div className='author_name font-semibold'>{authorName}</div>
			</SkeletonWrapper>
			<div className='ml-2 w-full whitespace-nowrap overflow-hidden text-ellipsis'>
				{description}
			</div>
			<div
				className='text-gray50 cursor-pointer'
				onClick={() => setVisibleModal(true)}
			>
				more
			</div>
		</div>
	)
}

export default PostFooterDescription
