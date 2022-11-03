import { useLayoutEffect, useState } from 'react'

/**
 * useWindowSize
 * @returns {windowWidth: number, windowHeight: number}
 */
const useWindowSize = () => {
	const [size, setSize] = useState({ windowWidth: 0, windowHeight: 0 })
	useLayoutEffect(() => {
		const updateSize = () => {
			setSize({
				windowWidth: window.innerWidth,
				windowHeight: window.innerHeight,
			})
		}
		window.addEventListener('resize', updateSize)
		updateSize()
		return () => window.removeEventListener('resize', updateSize)
	}, [])
	return size
}

export default useWindowSize
