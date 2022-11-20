import { memo } from 'react'

type PropsType = {
	message: string | string[]
}

const Success = (props: PropsType) => {
	const { message } = props
	if (!message || message === '') return <></>
	return (
		<div className='mt-2.5'>
			<div className='text-green mt-[10px] w-full px-5 text-center text-xs'>
				{message}
			</div>
		</div>
	)
}

export default memo(Success)
