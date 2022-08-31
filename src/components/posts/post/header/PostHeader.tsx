import './PostHeader.scss'
import ImageBox from '@components/common/image-box/ImageBox'
import moreIcon from '@assets/icons/post/more-icon.svg'
import {memo} from 'react'

type PropsType = {
  authorAvatar: string
  authorName: string
}

const PostHeader: React.FC<PropsType> = memo((props) => {
  const {authorAvatar, authorName} = props
  return (
    <div className='post_header'>
      <div className='author_info'>
        <ImageBox image={authorAvatar} isSmall={true}/>
        <span className='author_name'>{authorName}</span>
      </div>
      <img src={moreIcon} className='cursor-pointer hover:bg-gray-50 transition-all'/>
    </div>
  )
})


export default PostHeader
