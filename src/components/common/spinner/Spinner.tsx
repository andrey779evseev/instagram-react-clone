import s from './Spinner.module.scss'

const Spinner = () => {
	return (
		<div className='w-full h-fit flex justify-center'>
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
