import { useQuery } from '@tanstack/react-query'
import { memo, useState } from 'react'
import If from '@components/common/if/If'
import PostModel from '@api/common/models/post/PostModel'
import { PostService } from '@api/services/post/PostService'
import PostModal from '../modal/PostModal'
import PostFooter from './footer/PostFooter'
import PostHeader from './header/PostHeader'

type PropsType = {
	item: PostModel
}

const FeedPost = (props: PropsType) => {
	const { item: post } = props
	const [visibleModal, setVisibleModal] = useState(false)

	const { data: author, isLoading } = useQuery({
		queryKey: ['author', { post: post.Id }],
		queryFn: () => PostService.GetAuthor(post.Id),
	})

	return (
		<div className='border-gray10 flex w-full h-fit flex-col mt-2 last:mb-2 rounded-lg border-2'>
			<PostHeader
				authorAvatar={author?.Avatar}
				authorName={author?.Nickname}
				isLoading={isLoading}
			/>
			<div
				className='bg-dark h-[466px] bg-contain bg-no-repeat bg-center'
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
