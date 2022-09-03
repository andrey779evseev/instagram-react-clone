import { useEffect, useRef, useState } from 'react'

const useScrollTop = () => {
  const [scrollTop, setScrollTop] = useState(0)
  const ref = useRef<HTMLDivElement>()

  const onScroll = (e: any) => {
    requestAnimationFrame(() => {
      setScrollTop(e.target.scrollTop)
    })
  }

  useEffect(() => {
    const scrollContainer = ref.current

    if (scrollContainer) {
      setScrollTop(scrollContainer.scrollTop)
      scrollContainer.addEventListener('scroll', onScroll)
    }
    return () => {
      if (scrollContainer)
        scrollContainer.removeEventListener('scroll', onScroll)
    }
  }, [])

  return { scrollTop, ref }
}

export default useScrollTop