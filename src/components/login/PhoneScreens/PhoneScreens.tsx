import {useEffect, useState} from 'react'
import './PhoneScreens.scss'


const PhoneScreens: React.FC = () => {
  let [currentImageIndex, setCurrentImageIndex] = useState(1)
  useEffect(() => {
    const interval = setInterval(() => {
      currentImageIndex >= 4 ? setCurrentImageIndex(1) : setCurrentImageIndex(currentImageIndex + 1)
    }, 3000)
    return () => clearInterval(interval)
  })
  return (
    <div className='screen'>
      <div className={`screen_content sc_1 ${currentImageIndex === 1 ? 'active' : ''}`}></div>
      <div className={`screen_content sc_2 ${currentImageIndex === 2 ? 'active' : ''}`}></div>
      <div className={`screen_content sc_3 ${currentImageIndex === 3 ? 'active' : ''}`}></div>
      <div className={`screen_content sc_4 ${currentImageIndex === 4 ? 'active' : ''}`}></div>
    </div>
  )
}

export default PhoneScreens
