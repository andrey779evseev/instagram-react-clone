import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import PostModel from '@api/common/models/responses/PostModel'
import { PostService } from '@api/services/post/PostService'
import PostFooter from './footer/PostFooter'
import PostHeader from './header/PostHeader'

type PropsType = {
	item: PostModel
}

const FeedPost = (props: PropsType) => {
	const { item: post } = props

	const { data: author, isLoading } = useQuery({
		queryKey: ['author', { post: post.Id }],
		queryFn: () => PostService.GetAuthor(post.Id),
	})

	return (
		<div className='post_container flex w-full h-fit flex-col mt-2 last:mb-2'>
			<PostHeader
				authorAvatar={author?.Avatar}
				authorName={author?.Nickname}
				isLoading={isLoading}
			/>
			<div
				className='bg-dark h-[470px] bg-contain bg-no-repeat bg-center'
				style={{ backgroundImage: `url('${post.Photo}')` }}
			></div>
			<PostFooter post={post} authorName={author?.Nickname} />
		</div>
	)
}

export default memo(FeedPost)
