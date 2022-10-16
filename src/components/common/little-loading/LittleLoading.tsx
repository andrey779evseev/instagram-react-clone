import { memo } from 'react'
import s from './LittleLoading.module.scss'

type PropsType = {
	color?: 'white' | 'gray' | 'cobalt'
}

const LittleLoading = (props: PropsType) => {
	const { color = 'gray' } = props

	return (
		<div className={`${s.lds_ellipsis} ${s[color]}`}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}

export default memo(LittleLoading)
