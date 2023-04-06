import { memo } from 'react'

type PropsType = {
	text: string
}

const DividerWithText = (props: PropsType) => {
	const { text } = props
	return (
		<div className='mb-[15px] mt-3 flex w-full items-center'>
			<div className='bg-gray10 h-px w-full'></div>
			<div className='mx-[18px] my-[6px]'>{text}</div>
			<div className='bg-gray10 h-px w-full'></div>
		</div>
	)
}

export default memo(DividerWithText)
