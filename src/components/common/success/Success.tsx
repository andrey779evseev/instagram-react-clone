import { memo } from 'react'

type PropsType = {
	message: string | string[]
}

const Success = (props: PropsType) => {
	const { message } = props
	if (!message || message === '') return <></>
	return (
		<div className='mt-2.5'>
			<div className='text-green w-full text-center text-xs mt-[10px] px-5'>
				{message}
			</div>
		</div>
	)
}

export default memo(Success)
