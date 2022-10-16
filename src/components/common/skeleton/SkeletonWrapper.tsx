import { PropsWithChildren, memo } from 'react'

type PropsType = PropsWithChildren<{
	condition: boolean
	skeleton: React.ReactElement
	className?: string
	full?: boolean
}>

const SkeletonWrapper = (props: PropsType) => {
	const { condition, skeleton, children, className, full = false } = props
	return (
		<div className={`${className} ${full ? 'w-full h-full' : 'w-auto h-auto'}`}>
			{!condition ? children : skeleton}
		</div>
	)
}

export default memo(SkeletonWrapper)
