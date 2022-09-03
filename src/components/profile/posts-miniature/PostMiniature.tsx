import PostMiniatureResponse from '@api/services/post/models/responses/PostMiniatureResponse'
import { memo } from 'react'


type PropsType = {
  item: PostMiniatureResponse
  size: number
}

const PostMiniature = memo((props: PropsType) => {
  const { 
    item: post, 
    size 
  } = props
  return (
    <div 
      className='bg-center bg-cover' 
      style={{backgroundImage: `url('${post.Photo}')`, width: size + 'px', height: size + 'px'}}
    />
  )
})


export default PostMiniature