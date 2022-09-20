import Avatar, { EnumAvatarSize } from '@components/common/avatar/Avatar'
import MoreIcon from '@components/common/assets/icons/MoreIcon'
import Skeleton from '@components/common/skeleton/Skeleton'
import SkeletonWrapper from '@components/common/skeleton/SkeletonWrapper'
import useWindowSize from '@hooks/UseWindowSize'
import { BaseSyntheticEvent, useMemo, useState } from 'react'
import s from './DetailPost.module.scss'


const DetailPost = () => {
  const [visible, setVisible] = useState(true)
  const [maxWidth, maxHeight] = useWindowSize()
  const isLoading = false
  const aspectRatio = 1/2.2
  const post = {
    "Id": "6bea56c2-3c3c-403f-9a18-1d001f29aa85",
    "Author": {
      "Id": "b770d456-8f16-49c1-9a8f-bdc6eeb45114",
      "Nickname": "malifor",
      "Avatar": "https://lh3.googleusercontent.com/a-/AFdZucpfaTbBH95gMxFv5AubLitvK8ffHa9wz2UXPnOqhw=s96-c"
    },
    "Description": "description 99",
    "Photo": "https://images.unsplash.com/photo-1662047920109-dbb718472918?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    "PostedAt": "2022-09-02T21:51:45.495323",
    "LikesInfo": {
      "FirstName": "malifor",
      "Avatars": [
        "https://lh3.googleusercontent.com/a-/AFdZucpfaTbBH95gMxFv5AubLitvK8ffHa9wz2UXPnOqhw=s96-c"
      ],
      "LikesCount": 1
    }
  }
  
  const styles = useMemo(() => {
    let width = maxWidth - 48
    let height = width * aspectRatio
    if (height > maxHeight - 48) {
      height = maxHeight - 48
      width = height / aspectRatio
    }
    return {
      height: height + 'px',
      width: width + 'px'
    }
  }, [maxHeight, maxWidth])

  const close = (e: BaseSyntheticEvent) => {
    if(e.target.className === s.detail_post_container)
      setVisible(false)
  }

  if(!visible)
    return <></>

  return (
    <div className={s.detail_post_container} onClick={close}>
      <div className={s.detail_post_content} style={styles}>
        <div className={s.detail_post_photo_container}>
          <SkeletonWrapper
            condition={isLoading}
            skeleton={<Skeleton height='100%' width='100%' variant='rectangular'/>}
          >
            <div className={s.detail_post_photo} style={{backgroundImage: `url('${post.Photo}')`}}/>
          </SkeletonWrapper>
        </div>
        <div className='w-1/2 h-full'>
          <div className={s.detail_post_content_header}>
            <div className='flex items-center'>
              <Avatar src={post.Author.Avatar} size={EnumAvatarSize.Medium}/>
              <span className='ml-[14px] text-sm font-medium'>{post.Author.Nickname}</span>
            </div>
            <MoreIcon/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailPost