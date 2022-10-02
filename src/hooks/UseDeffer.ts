import { useEffect, useState } from 'react'

const useDeffer = <T>(value: T, delay: number) => {
  const [innerValue, setInnerValue] = useState<T>(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setInnerValue(value)
    }, delay)
    return () => clearTimeout(timeout)
  }, [value])
  return innerValue
}



export default useDeffer