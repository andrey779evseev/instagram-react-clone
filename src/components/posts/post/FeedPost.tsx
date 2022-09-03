import {memo} from 'react'
import PostModel from '@models/post/Post'
import './FeedPost.scss'
import PostHeader from './header/PostHeader'
import PostFooter from './footer/PostFooter'

type PropsType = {
  post: PostModel
}

const FeedPost = memo((props: PropsType) => {
  const {post} = props
  return (
    <div className='post_container'>
      <PostHeader authorAvatar={post.AuthorAvatar} authorName={post.AuthorName}/>
      <div className='post_image' style={{backgroundImage: `url('${post.PostImage}')`}}></div>
      <PostFooter likesCount={post.LikesCount}/>
    </div>
  )
})


export default FeedPost
