import { PropsWithChildren, ReactElement } from 'react'

type PropsType = PropsWithChildren<{
	condition: unknown
}>

const Switch = (props: PropsType) => {
	const { condition, children } = props

	if (!children) return <></>

	return (children as ReactElement[]).find ? (
		(children as ReactElement[]).find((child) => {
			return child.props.value === condition
		})!
	) : (children as ReactElement).props.value === condition ? (
		(children as ReactElement)
	) : (
		<></>
	)
}

export default Switch
