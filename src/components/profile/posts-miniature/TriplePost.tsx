import PostMiniatureResponse from '@api/services/post/models/responses/PostMiniatureResponse'
import { memo } from 'react'
import PostMiniature from './PostMiniature'

const TriplePost = memo((props: {
  item: PostMiniatureResponse[],
  size: number,
  index: number
}) => {
  const {
    item,
    size,
    index
  } = props
  return (
    <div className='flex gap-[29px] mb-[29px] last:mb-0'>
      <PostMiniature item={item[0]} size={size} index={index}/>
      <PostMiniature item={item[1]} size={size} index={index}/>
      <PostMiniature item={item[2]} size={size} index={index}/>
    </div>
  )
})

export default TriplePost