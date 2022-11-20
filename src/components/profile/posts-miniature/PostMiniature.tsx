import { memo, useState } from 'react'
import CommentFilledIcon from '@components/common/assets/icons/CommentFilledIcon'
import HeartFilledIcon from '@components/common/assets/icons/HeartFilledIcon'
import If from '@components/common/if/If'
import PostModal from '@components/posts/modal/PostModal'
import PostMiniatureModel from '@api/common/models/post/PostMiniatureModel'
import s from './PostMiniature.module.scss'

type PropsType = {
	post: PostMiniatureModel
	size: number
}

const PostMiniature = (props: PropsType) => {
	const { post, size } = props
	const [isVisibleHover, setIsVisibleHover] = useState(false)
	const [visibleModal, setVisibleModal] = useState(false)

	const openModal = () => {
		setVisibleModal(true)
		setIsVisibleHover(false)
	}

	const closeModal = () => {
		setVisibleModal(false)
		setIsVisibleHover(false)
	}

	return (
		<div
			className='relative cursor-pointer text-white'
			onMouseEnter={() => setIsVisibleHover(true)}
			onMouseLeave={() => setIsVisibleHover(false)}
			onClick={openModal}
		>
			<div
				className='bg-cover bg-center'
				style={{
					backgroundImage: `url('${post.Photo}')`,
					width: size + 'px',
					height: size + 'px',
				}}
			/>
			<div className={`${s.post_miniature_hover} ${isVisibleHover && 'show'}`}>
				<span className='mr-8 flex items-center'>
					<HeartFilledIcon />
					<span className='ml-2'>{post.LikesCount}</span>
				</span>
				<span className='flex items-center'>
					<CommentFilledIcon />
					<span className='ml-2'>{post.CommentsCount}</span>
				</span>
			</div>
			<If condition={visibleModal}>
				<PostModal postId={post.Id} onClose={closeModal} />
			</If>
		</div>
	)
}

export default memo(PostMiniature)
