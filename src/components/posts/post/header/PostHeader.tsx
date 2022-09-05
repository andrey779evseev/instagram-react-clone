import ImageBox from '@components/common/image-box/ImageBox'
import moreIcon from '@assets/icons/post/more-icon.svg'
import {memo} from 'react'

type PropsType = {
  authorAvatar: string
  authorName: string
}

const PostHeader = memo((props: PropsType) => {
  const {authorAvatar, authorName} = props
  return (
    <div className='bg-white w-full flex items-center justify-between px-4 py-[9px] border border-gray10'>
      <div className='flex items-center'>
        <ImageBox image={authorAvatar} isSmall={true}/>
        <span className='ml-4'>{authorName}</span>
      </div>
      <img src={moreIcon} className='cursor-pointer hover:bg-gray-50 transition-all'/>
    </div>
  )
})


export default PostHeader
