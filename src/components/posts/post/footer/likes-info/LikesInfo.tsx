import { memo, useState } from 'react'
import If from '@components/common/if/If'
import LikesFormatter from '@components/common/likes-formatter/LikesFormatter'
import s from './LikesInfo.module.scss'
import LikesListModal from './modal/LikesListModal'

type PropsType = {
	images?: string[]
	firstName?: string
	count: number
	postId: string
}

const LikesInfo = (props: PropsType) => {
	const { images = [], firstName, count, postId } = props

	const [visibleModal, setVisibleModal] = useState(false)

	return (
		<div className='flex'>
			<If condition={images && images.length > 0}>
				<span
					className='relative mr-1 flex h-5 overflow-hidden'
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
							<img src={image} alt={`likes_info_user_№${i + 1}`} />
						</div>
					))}
				</span>
			</If>
			<div>
				{firstName ? (
					<span className='font-normal'>
						Liked by
						<span className='font-semibold'> {firstName} </span>
						<If condition={count - 1 > 0}>
							and
							<span
								className='cursor-pointer font-semibold'
								onClick={() => setVisibleModal(true)}
							>
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
			<If condition={visibleModal}>
				<LikesListModal
					onClose={() => setVisibleModal(false)}
					postId={postId}
				/>
			</If>
		</div>
	)
}

export default memo(LikesInfo)
