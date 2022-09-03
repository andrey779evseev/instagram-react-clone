import {memo, useMemo} from 'react'
import './Avatar.scss'
import defaultAvatar from '@assets/icons/common/default-avatar.jpg'


export enum EnumAvatarSize {
  Small = 'small',
  Medium = 'medium',
  Big = 'big',
  Large = 'large',
  ExtraLarge = 'extra-large'
}

type PropsType = {
  src: string | undefined | null
  size?: EnumAvatarSize
}

const Avatar = memo((props: PropsType) => {
  const {
    src, 
    size = EnumAvatarSize.Large
  } = props
  
  const avatar = useMemo(() => {
    return src ? src : defaultAvatar
  }, [src])

  return (
    <div className={`avatar ${size}`} style={{backgroundImage: `url('${avatar}')`}}></div>
  )
})


export default Avatar
