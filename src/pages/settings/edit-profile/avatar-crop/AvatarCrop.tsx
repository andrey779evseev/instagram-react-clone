import Button from '@components/common/button/Button'
import Modal from '@components/common/modal/Modal'
import useKeyPress from '@hooks/UseKeyPress'
import { cropImageViaCanvas } from '@utils/CropImageViaCanvas'
import { memo, SyntheticEvent, useEffect, useRef, useState } from 'react'
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from 'react-image-crop'

type PropsType = {
  aspect?: number
  onCrop: (image: string) => void
  url: string
  isLoading?: boolean
  onClose: () => void
  onLoadImage?: () => void
  className?: string
}

const AvatarCrop = (props: PropsType) => {
  const {
    aspect = 1 / 1,
    onCrop,
    url,
    isLoading,
    className,
    onClose,
    onLoadImage = undefined
  } = props

  const [crop, setCrop] = useState<Crop>()
  const [loaded, setLoaded] = useState(false)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const enterPressed = useKeyPress('Enter', true)

  useEffect(() => {
    if (enterPressed) getCroppedImg()
  }, [enterPressed])

  const getCroppedImg = () => {
    if (!imageRef.current?.width || !crop) return
    cropImageViaCanvas(crop, imageRef.current.width, url, base64 => {
      onCrop(base64)
    })
  }

  useEffect(() => {
    if (onLoadImage) onLoadImage()
  }, [])

  const onChange = (cropParams: Crop) => {
    if (!loaded) {
      setLoaded(true)
      if (onLoadImage) onLoadImage()
    }
    setCrop(cropParams)
  }

  return (
    <Modal
      height='90%'
      width='fit-content'
      onClose={onClose}
      className={className}
      contentClassName='relative'
    >
      <div className='p-4'>
        <ReactCrop
          crop={crop}
          onChange={onChange}
          onComplete={onChange}
          className='!flex w-fit'
          aspect={aspect}
          keepSelection={true}
          ruleOfThirds={true}
          style={{ height: 'calc(100% - 46px)' }}
        >
          <img
            src={url}
            className='h-full'
            ref={imageRef}
          />
        </ReactCrop>
        <Button
          onClick={getCroppedImg}
          className='mt-4'
          isLoading={isLoading}
          disabled={!crop}
        >
          Crop
        </Button>
      </div>
    </Modal>
  )
}

export default memo(AvatarCrop)
