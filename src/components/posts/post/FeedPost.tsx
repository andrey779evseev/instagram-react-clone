import {memo} from 'react'
import PostModel from '@models/post/Post'
import PostHeader from './header/PostHeader'
import PostFooter from './footer/PostFooter'

type PropsType = {
  post: PostModel
}

const FeedPost = (props: PropsType) => {
  const {post} = props
  return (
    <div className='flex w-full h-fit flex-col post_container mt-2 last:mb-2'>
      <PostHeader authorAvatar={post.AuthorAvatar} authorName={post.AuthorName}/>
      <div className='h-[588px] bg-contain bg-no-repeat bg-center bg-dark' style={{backgroundImage: `url('${post.PostImage}')`}}></div>
      <PostFooter likesCount={post.LikesCount}/>
    </div>
  )
}


export default memo(FeedPost)
