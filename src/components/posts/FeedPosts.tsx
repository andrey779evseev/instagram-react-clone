import posts from './posts.json'
import FeedPost from './post/FeedPost'


const FeedPosts = () => {
  return <div>
    {posts.map((post, i) => <FeedPost post={post} key={i}/>)}
  </div>
}

export default FeedPosts