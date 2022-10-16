import jsonColors from './colors.json'

export const scssColor = () => {
	const colors: { [key: string]: string } = jsonColors
	const arr = []
	for (const color in colors) {
		arr.push(`$${color}: ${colors[color]};`)
	}
	return arr.join('\n')
}
