import FeedPost from './post/FeedPost'
import posts from './posts.json'

const FeedPosts = () => {
	return (
		<div>
			{posts.map((post, i) => (
				<FeedPost post={post} key={i} />
			))}
		</div>
	)
}

export default FeedPosts
