import withClassName from '@hoc/WithClassName'
import { PropsWithChildren } from 'react'
import LittleLoading from '@components/common/little-loading/LittleLoading'
import s from './Button.module.scss'

export enum EnumButtonTheme {
	Primary = 'primary',
	Secondary = 'secondary',
}

type PropsType = PropsWithChildren<{
	width?: string
	disabled?: boolean
	onClick?: () => void
	isLoading?: boolean
	theme?: EnumButtonTheme
}>

const Button = (props: PropsType) => {
	const {
		children,
		onClick,
		width = '100%',
		disabled = false,
		isLoading = false,
		theme = EnumButtonTheme.Primary,
	} = props

	const click = () => {
		if (!isLoading && !disabled && onClick) onClick()
	}
	return (
		<button
			className={`${s.button} ${disabled && s.disabled} ${s[theme]}`}
			style={{ width }}
			onClick={click}
		>
			{isLoading ? <LittleLoading color='white' /> : children}
		</button>
	)
}

export default withClassName(Button)
