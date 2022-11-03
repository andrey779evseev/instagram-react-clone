import Avatar, { EnumAvatarSize } from '@components/common/avatar/Avatar'
import MoreButton from '@components/common/more-button/MoreButton'
import Skeleton from '@components/common/skeleton/Skeleton'
import SkeletonWrapper from '@components/common/skeleton/SkeletonWrapper'

type PropsType = {
	avatar: string | undefined
	nickname: string | undefined
	isLoading: boolean
}

const DetailPostHeader = (props: PropsType) => {
	const { avatar, nickname, isLoading } = props
	return (
		<div className='border-b-gray10 flex h-[60px] w-full items-center justify-between p-4 border-b'>
			<div className='flex items-center'>
				<SkeletonWrapper
					condition={isLoading}
					skeleton={<Skeleton variant='circular' width={32} height={32} />}
				>
					<Avatar src={avatar} size={EnumAvatarSize.Medium} />
				</SkeletonWrapper>
				<SkeletonWrapper
					condition={isLoading}
					skeleton={<Skeleton variant='text' width='300%' />}
					className='ml-4'
				>
					<span className='text-sm font-semibold'>{nickname}</span>
				</SkeletonWrapper>
			</div>
			<MoreButton />
		</div>
	)
}

export default DetailPostHeader
