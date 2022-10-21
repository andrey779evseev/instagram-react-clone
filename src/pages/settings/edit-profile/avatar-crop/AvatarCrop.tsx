import { memo, useEffect, useState } from 'react'
import { Crop } from 'react-image-crop'
import Button from '@components/common/button/Button'
import ImageCrop from '@components/common/image-crop/ImageCrop'
import Modal from '@components/common/modal/Modal'
import { cropImageViaCanvas } from '@utils/CropImageViaCanvas'
import useKeyPress from '@hooks/UseKeyPress'

type PropsType = {
	aspect?: number
	onCrop: (image: string) => void
	image: string
	isLoading?: boolean
	onClose: () => void
	onLoadImage?: () => void
	className?: string
}

const AvatarCrop = (props: PropsType) => {
	const {
		aspect = 1 / 1,
		onCrop,
		image,
		isLoading,
		className,
		onClose,
		onLoadImage = undefined,
	} = props

	const [crop, setCrop] = useState<Crop>()
	const [imageWidth, setImageWidth] = useState<number>(0)
	const [loaded, setLoaded] = useState(false)
	const enterPressed = useKeyPress('Enter', true)

	useEffect(() => {
		if (enterPressed) getCroppedImg()
	}, [enterPressed])

	const getCroppedImg = async () => {
		if (!imageWidth || !crop) return
		cropImageViaCanvas(crop, imageWidth, image).then((cropped) =>
			onCrop(cropped as string)
		)
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
				<ImageCrop
					crop={crop}
					onChange={onChange}
					image={image}
					aspect={aspect}
					onLoadImage={(e) =>
						setImageWidth((e.target as HTMLImageElement).width)
					}
					style={{ height: 'calc(100% - 46px)' }}
				/>
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
