import './Preloader.scss'
import {memo, useState} from 'react'
import preloaderIcon from '@assets/icons/preloader/preloader-icon.svg'

type PropsType = {
  full?: boolean
}

const Preloader = memo((props: PropsType) => {
  const {full = false} = props
  const [isShow, setIsShow] = useState(false)
  useState(() => {
    setTimeout(() => setIsShow(true), 100)
  })
  return (
    <div className={`preloader_container ${full ? 'full' : ''}`}>
      <img src={preloaderIcon} className='bg_icon'/>
      <div className={`preloader_icon ${isShow ? 'show' : 'preview'}`}></div>
    </div>
  )
})

export default Preloader
