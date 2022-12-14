import { memo } from 'react'
import useColor from '@hooks/UseColor'

type PropsType = {
	color?: string
}

const CloseIcon = (props: PropsType) => {
	const { color: propsColor = 'white' } = props

	const color = useColor(propsColor)

	return (
		<svg
			aria-label='Close'
			color={color}
			fill={color}
			height='18'
			role='img'
			viewBox='0 0 48 48'
			width='18'
		>
			<title>Close</title>
			<path
				clipRule='evenodd'
				d='M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z'
				fillRule='evenodd'
			></path>
		</svg>
	)
}

export default memo(CloseIcon)
