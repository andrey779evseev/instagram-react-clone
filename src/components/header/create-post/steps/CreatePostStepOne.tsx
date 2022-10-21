import { memo } from 'react'
import AssetsIcon from '@components/common/assets/icons/AssetsIcon'
import Button from '@components/common/button/Button'
import UploadImage from '@components/common/upload-image/UploadImage'

type PropsType = {
	onUpload: (file: File) => void
	value: number
}

const CreatePostStepOne = (props: PropsType) => {
	const { onUpload } = props
	return (
		<div className='flex-center w-full flex-grow flex-col px-10'>
			<AssetsIcon />
			<div className='font-light text-xxl mt-4'>
				Drag photos and videos here
			</div>
			<UploadImage onUpload={onUpload}>
				<Button className='mt-6'>Select from computer</Button>
			</UploadImage>
		</div>
	)
}

export default memo(CreatePostStepOne)
