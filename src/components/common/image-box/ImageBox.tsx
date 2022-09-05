import {memo} from 'react'
import s from './ImageBox.module.scss'


type PropsType = {
  image: string
  isSmall?: boolean
}

const ImageBox = memo((props: PropsType) => {
  const {image, isSmall = false} = props
  return (
    <div className={`${s.gradient_wrapper} ${isSmall && s.small}`}>
        <div
          style={{ backgroundImage: `url('${image}')` }}
          className={s.image_with_border}
        />
      </div>
  )
})


export default ImageBox
