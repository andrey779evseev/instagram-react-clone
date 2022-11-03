import s from './Spinner.module.scss'

type PropsType = {
	full?: boolean
}

const Spinner = (props: PropsType) => {
	const { full = false } = props
	return (
		<div
			className={`w-full ${
				full ? 'items-center h-full' : 'h-fit'
			} flex justify-center`}
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
