import { memo } from 'react'
import If from '@components/common/if/If'
import LikesFormatter from '@components/common/likes-formatter/LikesFormatter'
import s from './LikesInfo.module.scss'

type PropsType = {
	images?: string[]
	firstName?: string
	count: number
}

const LikesInfo = (props: PropsType) => {
	const { images = [], firstName, count } = props

	return (
		<div className='flex'>
			<If condition={images && images.length > 0}>
				<span
					className='flex h-5 relative overflow-hidden mr-1'
					style={{ width: Math.max(images.length * 17.5, 20) }}
				>
					{images.map((image, i) => (
						<div
							className={s.liked_by_avatar_img}
							style={{
								zIndex: images.length - i,
								left: i * -5,
							}}
							key={i}
						>
							<img src={image} />
						</div>
					))}
				</span>
			</If>
			<div>
				{firstName ? (
					<span>
						Liked by
						<span className='font-semibold'> {firstName} </span>
						<If condition={count - 1 > 0}>
							and
							<span className='font-semibold'>
								{' '}
								{count - 1} {count === 1 ? 'other' : 'others'}
							</span>
						</If>
					</span>
				) : (
					<span className='font-semibold'>
						<LikesFormatter />
					</span>
				)}
			</div>
		</div>
	)
}

export default memo(LikesInfo)
