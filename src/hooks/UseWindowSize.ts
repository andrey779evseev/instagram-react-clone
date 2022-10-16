import { useLayoutEffect, useState } from 'react'

/**
 * useWindowSize
 * @returns [width, height] of window
 */
const useWindowSize = () => {
	const [size, setSize] = useState([0, 0])
	useLayoutEffect(() => {
		function updateSize() {
			setSize([window.innerWidth, window.innerHeight])
		}
		window.addEventListener('resize', updateSize)
		updateSize()
		return () => window.removeEventListener('resize', updateSize)
	}, [])
	return size
}

export default useWindowSize
