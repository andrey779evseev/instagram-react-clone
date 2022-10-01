import MoreIcon from '@components/common/assets/icons/MoreIcon'
import ImageBox from '@components/common/image-box/ImageBox'
import MoreButton from '@components/common/more-button/MoreButton'
import { memo } from 'react'

type PropsType = {
  authorAvatar: string
  authorName: string
}

const PostHeader = (props: PropsType) => {
  const {authorAvatar, authorName} = props
  return (
    <div className='bg-white w-full flex items-center justify-between px-4 py-[9px] border border-gray10'>
      <div className='flex items-center'>
        <ImageBox image={authorAvatar} isSmall={true}/>
        <span className='ml-4'>{authorName}</span>
      </div>
      <MoreButton/>
    </div>
  )
}


export default memo(PostHeader)
