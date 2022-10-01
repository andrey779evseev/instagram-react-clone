import PostMiniatureModel from '@api/common/models/responses/PostMiniatureModel'
import { memo, useState } from 'react'
import s from './PostMiniature.module.scss'
import HeartFilledIcon from '@components/common/assets/icons/HeartFilledIcon'
import CommentFilledIcon from '@components/common/assets/icons/CommentFilledIcon'
import DetailPost from '@components/posts/detail/DetailPost'
import If from '@components/common/if/If'
import {flushSync} from 'react-dom'


type PropsType = {
  post: PostMiniatureModel
  size: number
}

const PostMiniature = (props: PropsType) => {
  const { 
    post,
    size
  } = props
  const [isVisibleHover, setIsVisibleHover] = useState(false)
  const [visibleModal, setVisibleModal] = useState(false)

  const openModal = () => {
    setVisibleModal(true)
    setIsVisibleHover(false)
  }

  return (
    <div 
      className="relative text-white cursor-pointer"
      onMouseEnter={() => setIsVisibleHover(true)}
      onMouseLeave={() => setIsVisibleHover(false)}
      onClick={openModal}
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
          <CommentFilledIcon/>
          <span className='ml-2'>
            {post.CommentsCount}
          </span>
        </span>
      </div>
      <If condition={visibleModal}>
        <DetailPost id={post.Id} onClose={() => setVisibleModal(false)}/>
      </If>
    </div>
  )
}


export default memo(PostMiniature)
