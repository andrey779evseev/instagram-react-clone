import { useMemo } from 'react'
import jsonColors from '@utils/colors/colors.json'

const useColor = (color?: string): string => {
	const colors: { [key: string]: string } = jsonColors
	return useMemo(() => {
		if (!color) return ''
		return color.startsWith('#') ? color : colors[color]
	}, [color])
}

export default useColor
