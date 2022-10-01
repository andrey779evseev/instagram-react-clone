import useKeyPress from '@hooks/UseKeyPress'
import { cropImageViaCanvas } from '@utils/CropImageViaCanvas'
import {
  memo,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from 'react-image-crop'
import Button from '../button/Button'
import Modal from '../modal/Modal'

type PropsType = {
  aspect?: number
  onCrop: (image: string) => void
  url: string
  isLoading?: boolean
  onClose?: () => void
  onLoadImage?: () => void
  className?: string
}

const ImageCrop = (props: PropsType) => {
  const {
    aspect = 1 / 1,
    onCrop,
    url,
    isLoading,
    className,
    onClose = undefined,
    onLoadImage = undefined
  } = props

  const [crop, setCrop] = useState<Crop>()
  const imageRef = useRef<HTMLImageElement | null>(null)
  const enterPressed = useKeyPress('Enter', true)

  useEffect(() => {
    if (enterPressed) getCroppedImg()
  }, [enterPressed])

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget
    const isMaxWidth = width > height
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          height: isMaxWidth ? 90 : undefined,
          width: isMaxWidth ? undefined : 90
        },
        aspect,
        width,
        height
      ),
      width,
      height
    )
    setCrop(crop)
    if (onLoadImage) onLoadImage()
  }

  const getCroppedImg = () => {
    if (!imageRef.current?.width || !crop) return
    cropImageViaCanvas(crop, imageRef.current.width, url, base64 => {
      onCrop(base64)
    })
  }

  return (
    <Modal
      height='90%'
      width='fit-content'
      onClose={onClose}
      className={className}
    >
      <div className='p-4 h-full flex flex-col w-fit'>
        <ReactCrop
          crop={crop}
          onChange={c => setCrop(c)}
          onComplete={c => setCrop(c)}
          className='!flex w-fit'
          aspect={aspect}
          keepSelection={true}
          ruleOfThirds={true}
          style={{ height: 'calc(100% - 46px)' }}
        >
          <img
            src={url}
            className='h-full'
            onLoad={onImageLoad}
            ref={imageRef}
          />
        </ReactCrop>
        <Button onClick={getCroppedImg} className='mt-4' isLoading={isLoading}>
          Crop
        </Button>
      </div>
    </Modal>
  )
}

export default memo(ImageCrop)
