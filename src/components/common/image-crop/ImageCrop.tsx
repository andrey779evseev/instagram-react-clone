import { memo } from 'react'
import ReactCrop, { Crop } from 'react-image-crop'

type PropsType = {
	image: string
	aspect?: number
	style?: React.CSSProperties
	crop: Crop | undefined
	onChange: (value: Crop) => void
	onLoadImage?: (e: React.SyntheticEvent<HTMLImageElement>) => void
}

const ImageCrop = (props: PropsType) => {
	const { image, style, crop, onChange, onLoadImage, aspect = 1 / 1 } = props

	return (
		<ReactCrop
			crop={crop}
			onChange={onChange}
			onComplete={onChange}
			aspect={aspect}
			className='!flex w-fit'
			keepSelection={true}
			ruleOfThirds={true}
			style={style}
		>
			<img
				src={image}
				className='h-full'
				onLoad={onLoadImage}
				alt='crop_image'
			/>
		</ReactCrop>
	)
}

export default memo(ImageCrop)
