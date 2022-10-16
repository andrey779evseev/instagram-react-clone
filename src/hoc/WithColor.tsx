import { memo } from 'react'
import getComponentName from '@utils/GetComponentName'
import { ColorsTypes } from '@utils/colors/ColorType'
import useColor from '@hooks/UseColor'

type PropsType = {
	color?: ColorsTypes
}

/**
 * this HOC is mostly recommended for use with icons only (in folder src/components/assets)
 */
const withColor = <P extends object & JSX.IntrinsicAttributes>(
	Component: React.ComponentType<P>,
	defaultColor: ColorsTypes = 'dark'
) => {
	const WithColor = memo((props: Omit<P, keyof PropsType> & PropsType) => {
		const { color = defaultColor } = props
		const parsedColor = useColor(color)
		return <Component {...(props as P)} color={parsedColor} />
	})
	WithColor.displayName = `withClassIcon${getComponentName(Component)}`
	return WithColor
}

export default withColor
