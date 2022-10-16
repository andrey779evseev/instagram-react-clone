import { useEffect, useRef, useState } from 'react'

const useScrollTop = (fromRoot: boolean = false) => {
	const [scrollTop, setScrollTop] = useState(0)
	const ref = useRef<HTMLDivElement>()

	const onScroll = (e: Event) => {
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
