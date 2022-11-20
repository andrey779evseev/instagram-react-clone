import { memo } from 'react'
import useColor from '@hooks/UseColor'
import Modal from '../Modal'

type PropsType = {
	title?: string
	description?: string
	firstActionTitle?: string
	firstAction?: () => void
	secondAction?: () => void
	secondActionTitle?: string
	color?: string
	onClose: () => void
	visible?: boolean
}

const ConfirmationModal = (props: PropsType) => {
	const {
		title,
		description,
		firstAction,
		secondAction,
		color: propsColor,
		onClose,
		firstActionTitle,
		secondActionTitle,
		visible = true,
	} = props

	const color = useColor(propsColor)

	if (!visible) return <></>

	return (
		<Modal
			width='fit-content'
			height='fit-content'
			minWidth='300px'
			onClose={onClose}
			rounded
		>
			<div className='flex h-full w-full flex-col'>
				<div className='flex-center grow flex-col p-8 pb-4'>
					<div className='text-lg font-semibold'>{title}</div>
					<div className='text-gray50 mt-1 text-sm'>{description}</div>
				</div>
				<div
					className='flex-center hover:bg-gray10 border-y-gray20 h-12 cursor-pointer border-y font-bold transition-colors'
					style={{ color }}
					onClick={firstAction}
				>
					{firstActionTitle}
				</div>
				<div
					className='flex-center hover:bg-gray10 h-12 cursor-pointer transition-colors'
					onClick={secondAction}
				>
					{secondActionTitle}
				</div>
			</div>
		</Modal>
	)
}

export default memo(ConfirmationModal)
