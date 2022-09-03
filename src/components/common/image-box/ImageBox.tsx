import {memo} from 'react'
import './ImageBox.scss'


type PropsType = {
  image: string
  isSmall?: boolean
}

const ImageBox = memo((props: PropsType) => {
  const {image, isSmall = false} = props
  return (
    <div className={`gradient_wrapper ${isSmall ? 'small' : ''}`}>
        <div
          style={{ backgroundImage: `url('${image}')` }}
          className='image_with_border'
        />
      </div>
  )
})


export default ImageBox
