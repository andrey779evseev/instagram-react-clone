import {useEffect, useState} from 'react'
import s from './PhoneScreens.module.scss'


const PhoneScreens = () => {
  let [currentImageIndex, setCurrentImageIndex] = useState(1)
  useEffect(() => {
    const interval = setInterval(() => {
      currentImageIndex >= 4 ? setCurrentImageIndex(1) : setCurrentImageIndex(currentImageIndex + 1)
    }, 3000)
    return () => clearInterval(interval)
  })
  return (
    <div className={s.screen}>
      <div className={`${s.screen_content} ${s.sc_1} ${currentImageIndex === 1 && s.active}`}></div>
      <div className={`${s.screen_content} ${s.sc_2} ${currentImageIndex === 2 && s.active}`}></div>
      <div className={`${s.screen_content} ${s.sc_3} ${currentImageIndex === 3 && s.active}`}></div>
      <div className={`${s.screen_content} ${s.sc_4} ${currentImageIndex === 4 && s.active}`}></div>
    </div>
  )
}

export default PhoneScreens
