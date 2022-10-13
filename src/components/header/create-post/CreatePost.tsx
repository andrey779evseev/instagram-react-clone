import AssetsIcon from '@components/common/assets/icons/AssetsIcon'
import Button from '@components/common/button/Button'
import ConfirmationWindow from '@components/common/modal/confirmation-modal/ConfirmationWindow'
import Modal from '@components/common/modal/Modal'
import UploadImage from '@components/common/upload-image/UploadImage'
import { memo } from 'react'

type PropsType = {
  onClose: () => void
}

const CreatePost = (props: PropsType) => {
  const { onClose } = props

  const onUpload = (file: File) => {
    console.log(file)
  }

  return (
    <Modal
      width='50%'
      height={window.innerHeight - 100}
      aspectRatio={2.7 / 3}
      onClose={onClose}
      rounded
    >
      <div className='w-full h-full flex flex-col'>
        <div className='w-full h-11 border-b border-b-gray20 flex-center'>
          <span className='text-base font-semibold'>Create new post</span>
        </div>
        <div className='flex-center w-full flex-grow flex-col'>
          <AssetsIcon />
          <div className='font-light text-xxl mt-4'>
            Drag photos and videos here
          </div>
          <UploadImage onUpload={onUpload}>
            <Button className='mt-6'>Select from computer</Button>
          </UploadImage>
        </div>
      </div>
    </Modal>
  )
}

export default memo(CreatePost)
