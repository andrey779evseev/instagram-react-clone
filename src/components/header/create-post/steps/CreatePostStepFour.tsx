import { memo } from 'react'

type PropsType = {
	value: number
}

const CreatePostStepFour = (_props: PropsType) => {
	return (
		<div className='flex-center w-[300px] flex-1 flex-col'>
			<img src='/assets/mark-done.gif' alt='mark_done' className='h-24 w-24' />
			<div className='my-4 text-center text-xl font-light'>
				Your post has been shared.
			</div>
		</div>
	)
}

export default memo(CreatePostStepFour)
