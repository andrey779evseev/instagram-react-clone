import { memo } from 'react'
import ArrowIcon from '@components/common/assets/icons/ArrowIcon'
import If from '@components/common/if/If'
import LittleLoading from '@components/common/little-loading/LittleLoading'
import { CreatePostStepType } from './CreatePost'

type PropsType = {
	currentStep: number
	back: () => void
	next: () => void
	step: CreatePostStepType
	isDisabled: boolean
	isLoading: boolean
}

const CreatePostHeader = (props: PropsType) => {
	const { currentStep, back, next, step, isDisabled, isLoading } = props
	return (
		<div
			className={`min-h-11 border-b-gray20 flex-center w-full h-11 px-4 pt-1 border-b select-none ${
				currentStep !== 1 && currentStep !== 4 && '!justify-between'
			}`}
		>
			<If condition={step.AvailableBack}>
				<div className='cursor-pointer p-2' onClick={back}>
					<ArrowIcon />
				</div>
			</If>
			<span className='text-base font-semibold'>{step.Title}</span>
			<If condition={step.NextTitle !== null}>
				<span
					className={`text-cobalt font-semibold cursor-pointer p-2 ${
						isDisabled && 'opacity-50'
					}`}
					onClick={next}
				>
					{isLoading && currentStep === 3 ? (
						<LittleLoading color='cobalt' />
					) : (
						step.NextTitle
					)}
				</span>
			</If>
		</div>
	)
}

export default memo(CreatePostHeader)
