import {memo, useMemo} from 'react'
import defaultAvatar from '@assets/icons/common/default-avatar.jpg'
import AsyncImage from '../async-image/AsyncImage'


export enum EnumAvatarSize {
  /** size: 25px */
  Small = 'small',
  /** size: 32px */
  Medium = 'medium',
  /** size: 38px */
  Big = 'big',
  /** size: 56px */
  Large = 'large',
  /** size: 150px */
  ExtraLarge = 'extra-large'
}

type PropsType = {
  src: string | undefined | null
  size?: EnumAvatarSize
}

const Avatar = (props: PropsType) => {
  const {
    src, 
    size = EnumAvatarSize.Large
  } = props
  
  const avatar = useMemo(() => {
    return src ? src : defaultAvatar
  }, [src])

  const imgSize = useMemo(() => {
    switch (size) {
      case EnumAvatarSize.ExtraLarge:
        return 150
      case EnumAvatarSize.Large:
        return 56
      case EnumAvatarSize.Big:
        return 38
      case EnumAvatarSize.Medium:
        return 32
      default:
        return 25
    }
  }, [size])

  return (
    <>
      <AsyncImage height={imgSize} width={imgSize} url={avatar} rounded/>
    </>
  )
}


export default memo(Avatar)
