import PostMiniatureResponse from '@api/services/post/models/responses/PostMiniatureResponse'
import AsyncImage from '@components/common/async-image/AsyncImage'
import { memo } from 'react'


type PropsType = {
  item: PostMiniatureResponse
  size: number
  index: number
}

const PostMiniature = memo((props: PropsType) => {
  const { item: post, size, index } = props
  return (
    <div className='relative'>
      <div 
        className='bg-center bg-cover' 
        style={{backgroundImage: `url('${post.Photo}')`, width: size + 'px', height: size + 'px'}}
      />
      <div className='absolute top-0 left-0 w-full h-full bg-dark/50 flex flex-col items-center justify-center'>
        <div className='text-9xl text-white font-thin'>{index + 1}</div>
      </div>
    </div>
  )
})


export default PostMiniature