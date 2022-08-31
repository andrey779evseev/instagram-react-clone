import {LegacyRef, useEffect, useRef} from 'react'

const useClickOutside = (callback: Function) => {
  const callbackRef = useRef<Function>()
  const innerRef = useRef<HTMLDivElement>()

  useEffect(() => { callbackRef.current = callback; })

  useEffect(() => {
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
    function handleClick(e: any) {
      if (innerRef.current && callbackRef.current &&
        !innerRef.current.contains(e.target)
      ) callbackRef.current(e)
    }
  }, [])

  return innerRef as LegacyRef<HTMLDivElement>
}

export default useClickOutside
