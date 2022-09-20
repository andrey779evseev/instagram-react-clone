import PostMiniatureResponse from '@api/services/post/models/responses/PostMiniatureResponse'
import { memo, useState } from 'react'
import s from './PostMiniature.module.scss'
import HeartFilledIcon from '@components/common/assets/icons/HeartFilledIcon'
import CommentIcon from '@components/common/assets/icons/CommentIcon'


type PropsType = {
  item: PostMiniatureResponse
  size: number
}

const PostMiniature = (props: PropsType) => {
  const { 
    item: post, 
    size 
  } = props
  const [isVisibleHover, setIsVisibleHover] = useState(false)

  return (
    <div 
      className="relative text-white"
      onMouseEnter={() => setIsVisibleHover(true)}
      onMouseLeave={() => setIsVisibleHover(false)}
    >
      <div
        className='bg-center bg-cover' 
        style={{backgroundImage: `url('${post.Photo}')`, width: size + 'px', height: size + 'px'}}
      />
      <div className={`${s.post_miniature_hover} ${isVisibleHover && 'show'}`}>
        <span className='mr-8 flex items-center'>
          <HeartFilledIcon/>
          <span className='ml-2'>
            {post.LikesCount}
          </span>
        </span>
        <span className='flex items-center'>
          <CommentIcon/>
          <span className='ml-2'>
            {post.CommentsCount}
          </span>
        </span>
      </div>
    </div>
  )
}


export default memo(PostMiniature)