import { memo } from 'react'

type PropsType = {
	value: number
}

const CreatePostStepFour = (_props: PropsType) => {
	return (
		<div className='flex-center flex-col w-[300px] flex-1'>
			<img src='/assets/mark-done.gif' alt='mark_done' className='h-24 w-24' />
			<div className='text-center font-light text-xl my-4'>
				Your post has been shared.
			</div>
		</div>
	)
}

export default memo(CreatePostStepFour)
