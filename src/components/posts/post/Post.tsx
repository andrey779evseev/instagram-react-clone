import {memo} from 'react'
import PostModel from '@models/post/Post'
import './Post.scss'
import PostHeader from './header/PostHeader'
import PostFooter from './footer/PostFooter'

type PropsType = {
  post: PostModel
}

const Post: React.FC<PropsType> = memo((props) => {
  const {post} = props
  return (
    <div className='post_container'>
      <PostHeader authorAvatar={post.AuthorAvatar} authorName={post.AuthorName}/>
      <div className='post_image' style={{backgroundImage: `url('${post.PostImage}')`}}></div>
      <PostFooter likesCount={post.LikesCount}/>
    </div>
  )
})


export default Post
