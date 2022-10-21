import ImageCrop from '@components/common/image-crop/ImageCrop'
import { memo } from 'react'
import { Crop } from 'react-image-crop'

type PropsType = {
	value: number
	image: string
	crop: Crop | undefined
	setImageWidth: (value: number) => void
	setCrop: (crop: Crop) => void
}

const CreatePostStepTwo = (props: PropsType) => {
	const { image, crop, setCrop, setImageWidth } = props

	return (
		<>
			<div style={{ height: 'calc(100% - 44px)' }}>
				<ImageCrop
					image={image!}
					crop={crop}
					onChange={setCrop}
					onLoadImage={(e) =>
						setImageWidth((e.target as HTMLImageElement).width)
					}
					style={{ height: '100%' }}
				/>
			</div>
		</>
	)
}

export default memo(CreatePostStepTwo)
