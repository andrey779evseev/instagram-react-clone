import { memo } from 'react'
import CloseIcon from '@components/common/assets/icons/CloseIcon'

type PropsType = {
	title: string
	onClose: () => void
}

const ModalHeader = (props: PropsType) => {
	const { title, onClose } = props
	return (
		<div className='min-h-10 border-b-gray20 flex-center h-10 border-b w-full text-base font-semibold relative'>
			{title}
			<div className='absolute right-4 mt-px cursor-pointer' onClick={onClose}>
				<CloseIcon color='dark' />
			</div>
		</div>
	)
}

export default memo(ModalHeader)
