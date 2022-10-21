import { Crop } from 'react-image-crop'

export const cropImageViaCanvas = async (
	crop: Crop,
	width: number,
	url: string
): Promise<string> => {
	if (!crop) return ''
	const img = new Image()
	img.src = url
	img.crossOrigin = 'anonymous'

	return new Promise((resolve) => {
		img.onload = () => {
			const ratio = width / img.naturalWidth
			const canvas = document.createElement('canvas')
			canvas.width = crop.width / ratio
			canvas.height = crop.height / ratio
			const context = canvas.getContext('2d')!
			context.drawImage(
				img,
				crop.x / ratio,
				crop.y / ratio,
				crop.width / ratio,
				crop.height / ratio,
				0,
				0,
				crop.width / ratio,
				crop.height / ratio
			)
			const cropped = canvas.toDataURL('image/jpeg')
			resolve(cropped)
		}
	})
}
