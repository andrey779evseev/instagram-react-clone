import { memo } from 'react'
import PostModel from '@models/post/Post'
import PostFooter from './footer/PostFooter'
import PostHeader from './header/PostHeader'

type PropsType = {
	post: PostModel
}

const FeedPost = (props: PropsType) => {
	const { post } = props
	return (
		<div className='post_container flex w-full h-fit flex-col mt-2 last:mb-2'>
			<PostHeader
				authorAvatar={post.AuthorAvatar}
				authorName={post.AuthorName}
			/>
			<div
				className='bg-dark h-[588px] bg-contain bg-no-repeat bg-center'
				style={{ backgroundImage: `url('${post.PostImage}')` }}
			></div>
			<PostFooter likesCount={post.LikesCount} />
		</div>
	)
}

export default memo(FeedPost)
