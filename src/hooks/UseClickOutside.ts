import { LegacyRef, useCallback, useEffect, useRef } from 'react'

const useClickOutside = (callback: (e: MouseEvent) => void) => {
	const callbackRef = useRef<(e: MouseEvent) => void>()
	const innerRef = useRef<HTMLDivElement>()

	useEffect(() => {
		callbackRef.current = callback
	}, [callback])

	const handleClick = useCallback(
		(e: MouseEvent) => {
			if (
				innerRef.current &&
				callbackRef.current &&
				!innerRef.current.contains(e.target as HTMLElement) &&
				innerRef.current !== e.target
			)
				callbackRef.current(e)
		},
		[innerRef, callbackRef]
	)

	useEffect(() => {
		document.addEventListener('click', handleClick)
		return () => document.removeEventListener('click', handleClick)
	}, [])

	return innerRef as LegacyRef<HTMLDivElement>
}

export default useClickOutside
