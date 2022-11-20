import s from './Spinner.module.scss'

type PropsType = {
	full?: boolean
	className?: string
}

const Spinner = (props: PropsType) => {
	const { className = '', full = false } = props
	return (
		<div
			className={`w-full ${
				full ? 'h-full items-center' : 'h-fit'
			} flex justify-center ${className}`}
		>
			<div className={s.lds_spinner}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	)
}

export default Spinner
