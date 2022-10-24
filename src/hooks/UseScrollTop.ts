import { useEffect, useRef, useState } from 'react'

/**
 *
 * @param fromRoot returns scroll top for window else for element provided to ref
 * @param checkForFixedBody if body became fixed (scroll top automatically reduces to zero) it will return last scroll top before its happened
 */
const useScrollTop = (
	fromRoot: boolean = false,
	checkForFixedBody: boolean = false
) => {
	const [scrollTop, setScrollTop] = useState(0)
	const ref = useRef<HTMLDivElement>()

	const onScroll = (e: Event) => {
		if (checkForFixedBody && document.body.style.position === 'fixed') return

		if (fromRoot) setScrollTop(window.scrollY)
		else
			requestAnimationFrame(() => {
				setScrollTop((e.target as HTMLElement).scrollTop)
			})
	}

	useEffect(() => {
		const scrollContainer = ref.current

		if (scrollContainer) {
			setScrollTop(scrollContainer.scrollTop)
			scrollContainer.addEventListener('scroll', onScroll)
		} else if (fromRoot) {
			setScrollTop(window.scrollY)
			window.addEventListener('scroll', onScroll)
		}
		return () => {
			if (scrollContainer)
				scrollContainer.removeEventListener('scroll', onScroll)
			else if (fromRoot) window.removeEventListener('scroll', onScroll)
		}
	}, [])

	return { scrollTop, ref }
}

export default useScrollTop
