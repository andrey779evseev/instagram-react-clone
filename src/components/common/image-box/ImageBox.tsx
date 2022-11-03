import { memo } from 'react'
import Avatar, { EnumAvatarSize } from '../avatar/Avatar'
import Skeleton from '../skeleton/Skeleton'
import SkeletonWrapper from '../skeleton/SkeletonWrapper'
import s from './ImageBox.module.scss'

type PropsType = {
	image: string | undefined
	isSmall?: boolean
	isLoading?: boolean
}

const ImageBox = (props: PropsType) => {
	const { image, isSmall = false, isLoading = false } = props
	return (
		<div className={`${s.gradient_wrapper} ${isSmall && s.small}`}>
			<div className='rounded-full border-2 border-white'>
				<SkeletonWrapper
					condition={isLoading}
					skeleton={
						<Skeleton
							variant='circular'
							width={isSmall ? 25 : 56}
							height={isSmall ? 25 : 56}
						/>
					}
				>
					<Avatar
						src={image}
						size={isSmall ? EnumAvatarSize.Small : EnumAvatarSize.Large}
					/>
				</SkeletonWrapper>
			</div>
		</div>
	)
}

export default memo(ImageBox)
