import { Crop } from 'react-image-crop'

export const cropImageViaCanvas = (
	crop: Crop,
	width: number,
	url: string,
	callback: (url: string) => void
) => {
	if (!crop) return
	const img = new Image()
	img.src = url
	img.crossOrigin = 'anonymous'

	const canvas = document.createElement('canvas')
	canvas.width = crop.width
	canvas.height = crop.height
	const context = canvas.getContext('2d')!

	img.onload = () => {
		const ratio = img.naturalWidth / width
		context.drawImage(
			img,
			crop.x * ratio,
			crop.y * ratio,
			crop.width * ratio,
			crop.height * ratio,
			0,
			0,
			crop.width,
			crop.height
		)
		const cropped = canvas.toDataURL('image/jpeg')
		callback(cropped)
	}
}
