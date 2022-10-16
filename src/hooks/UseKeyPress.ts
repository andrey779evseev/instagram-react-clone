import { useEffect, useState } from 'react'

const useKeyPress = (targetKey: string, prevent: boolean = false) => {
	const [keyPressed, setKeyPressed] = useState<boolean>(false)

	const downHandler = (e: KeyboardEvent) => {
		if (e.key === targetKey) {
			setKeyPressed(true)
			if (prevent) e.preventDefault()
		}
	}

	const upHandler = (e: KeyboardEvent) => {
		if (e.key === targetKey) {
			setKeyPressed(false)
			if (prevent) e.preventDefault()
		}
	}
	useEffect(() => {
		window.addEventListener('keydown', downHandler)
		window.addEventListener('keyup', upHandler)

		return () => {
			window.removeEventListener('keydown', downHandler)
			window.removeEventListener('keyup', upHandler)
		}
	}, [])
	return keyPressed
}

export default useKeyPress
