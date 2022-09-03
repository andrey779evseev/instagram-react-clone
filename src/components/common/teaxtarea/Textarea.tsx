import './Textarea.scss'
import {memo, useMemo, useState} from 'react'

type PropsType = {
  value: string
  setValue: Function
  placeholder?: string
  required?: boolean
  rows?: number
  minimalistic?: boolean
}

const Textarea = memo((props: PropsType) => {
  const {
    value,
    setValue,
    placeholder = '',
    required = false,
    rows = 3,
    minimalistic = false
  } = props
  const [isTouched, setIsTouched] = useState(false)
  const isError = useMemo(() => {
    return isTouched && required && value === ''
  }, [isTouched, required, value])
  return (
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={`textarea ${isError && 'with_error'} ${minimalistic && 'minimalistic'}`}
      placeholder={placeholder}
      onBlur={() => setIsTouched(true)}
    />
  )
})

export default Textarea
