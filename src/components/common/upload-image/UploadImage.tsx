import { ChangeEvent, PropsWithChildren, memo } from 'react'
import s from './UploadImage.module.scss'

type PropsType = PropsWithChildren<{
	onUpload: (file: File) => void
}>

const UploadImage = (props: PropsType) => {
	const { children, onUpload } = props

	const upload = (e: ChangeEvent<HTMLInputElement>) => {
		if (e && e.target.files && e.target.files[0]) onUpload(e.target.files[0])
		e.target.value = ''
	}

	return (
		<div className={s.upload_image_container}>
			<input
				type='file'
				accept='image/*'
				onChange={upload}
				className={s.upload_image_input}
			/>
			<div className={s.upload_image_content}>{children}</div>
		</div>
	)
}

export default memo(UploadImage)
