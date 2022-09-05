import s from './Preloader.module.scss'
import {memo, useState} from 'react'
import preloaderIcon from '@assets/icons/preloader/preloader-icon.svg'

type PropsType = {
  full?: boolean
}

const PagePreloader = memo((props: PropsType) => {
  const {full = false} = props
  const [isShow, setIsShow] = useState(false)
  useState(() => {
    setTimeout(() => setIsShow(true), 100)
  })
  return (
    <div className={`${s.preloader_container} ${full && s.full}`}>
      <img src={preloaderIcon} className={s.bg_icon}/>
      <div className={`${s.preloader_icon} ${isShow && 'show'}`}></div>
    </div>
  )
})

export default PagePreloader
