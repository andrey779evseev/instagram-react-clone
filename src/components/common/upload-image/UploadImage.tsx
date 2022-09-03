import {ChangeEvent, memo} from 'react'
import './UploadImage.scss'


type PropsType = {
  children?: JSX.Element
  uploadImage: (file: File) => void
}

const UploadImage = memo((props: PropsType) => {
  const {
    children,
    uploadImage
  } = props

  const upload = (e: ChangeEvent<HTMLInputElement>) => {
    if(e && e.target.files && e.target.files[0])
      uploadImage(e.target.files[0])
  }

  return (
    <div className='upload_image_container'>
      <input
        type="file"
        accept="image/*"
        onChange={upload}
        className='upload_image_input'
      />
      <div className="upload_image_content">
        {children}
      </div>
    </div>
  )
})

export default UploadImage
