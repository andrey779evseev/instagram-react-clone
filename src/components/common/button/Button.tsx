import { PropsWithChildren } from 'react'
import LittleLoading from '@components/common/little-loading/LittleLoading'
import s from './Button.module.scss'

type PropsType = PropsWithChildren<{
	width?: string
	disabled?: boolean
	onClick?: (() => void) | ((e: React.MouseEvent) => void)
	isLoading?: boolean
	theme?: 'primary' | 'secondary'
	className?: string
}>

const Button = (props: PropsType) => {
	const {
		children,
		onClick,
		className = '',
		width = '100%',
		disabled = false,
		isLoading = false,
		theme = 'primary',
	} = props

	const click = (e: React.MouseEvent) => {
		if (!isLoading && !disabled && onClick) onClick(e)
	}
	return (
		<button
			className={`${s.button} ${disabled && s.disabled} ${
				s[theme]
			} ${className}`}
			style={{ width }}
			onClick={click}
		>
			{isLoading ? (
				<LittleLoading
					color={theme === 'primary' ? 'white' : 'cobalt'}
				/>
			) : (
				children
			)}
		</button>
	)
}

export default Button
