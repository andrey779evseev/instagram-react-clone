import './Posts.scss'
import posts from './posts.json'
import Post from './post/Post'


const Posts: React.FC = () => {
  return <div>
    {posts.map((post, i) => <Post post={post} key={i}/>)}
  </div>
}

export default Posts