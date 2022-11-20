import { memo, useState } from 'react'
import If from '@components/common/if/If'
import PostModel from '@api/common/models/post/PostModel'
import { usePostAuthorQuery } from '@api/services/post/PostService'
import PostModal from '../modal/PostModal'
import PostFooter from './footer/PostFooter'
import PostHeader from './header/PostHeader'

type PropsType = {
	item: PostModel
}

const FeedPost = (props: PropsType) => {
	const { item: post } = props
	const [visibleModal, setVisibleModal] = useState(false)

	const { data: author, isLoading } = usePostAuthorQuery(post.Id)

	return (
		<div className='border-gray10 mt-2 flex h-fit w-full flex-col rounded-lg border-2 last:mb-2'>
			<PostHeader
				authorAvatar={author?.Avatar}
				authorName={author?.Nickname}
				isLoading={isLoading}
			/>
			<div
				className='bg-dark h-[466px] bg-contain bg-center bg-no-repeat'
				style={{ backgroundImage: `url('${post.Photo}')` }}
			></div>
			<PostFooter
				post={post}
				authorName={author?.Nickname}
				setVisibleModal={setVisibleModal}
			/>
			<If condition={visibleModal}>
				<PostModal postId={post.Id} onClose={() => setVisibleModal(false)} />
			</If>
		</div>
	)
}

export default memo(FeedPost)
