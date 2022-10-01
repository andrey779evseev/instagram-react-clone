import PostMiniatureModel from '@api/common/models/responses/PostMiniatureModel'
import { memo } from 'react'
import PostMiniature from './PostMiniature'

const TriplePost = (props: {
  item: PostMiniatureModel[],
  size: number,
}) => {
  const {
    item,
    size
  } = props
  return (
    <div className='triple_post flex gap-[29px] mb-[29px]'>
      <PostMiniature post={item[0]} size={size}/>
      <PostMiniature post={item[1]} size={size}/>
      <PostMiniature post={item[2]} size={size}/>
    </div>
  )
}

export default memo(TriplePost)
