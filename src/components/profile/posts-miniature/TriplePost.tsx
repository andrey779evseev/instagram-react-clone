import PostMiniatureResponse from '@api/services/post/models/responses/PostMiniatureResponse'
import { memo } from 'react'
import PostMiniature from './PostMiniature'

const TriplePost = (props: {
  item: PostMiniatureResponse[],
  size: number,
}) => {
  const {
    item,
    size
  } = props
  return (
    <div className='triple_post flex gap-[29px] mb-[29px]'>
      <PostMiniature item={item[0]} size={size}/>
      <PostMiniature item={item[1]} size={size}/>
      <PostMiniature item={item[2]} size={size}/>
    </div>
  )
}

export default memo(TriplePost)