import { memo } from 'react'

type PropsType = {
	text: string
}

const DividerWithText = (props: PropsType) => {
	const { text } = props
	return (
		<div className='mt-3 mb-[15px] flex w-full items-center'>
			<div className='bg-gray10 h-px w-full'></div>
			<div className='my-[6px] mx-[18px]'>{text}</div>
			<div className='bg-gray10 h-px w-full'></div>
		</div>
	)
}

export default memo(DividerWithText)
