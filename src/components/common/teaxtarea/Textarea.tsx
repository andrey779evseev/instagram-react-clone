import s from './Textarea.module.scss'
import {memo, useMemo, useState} from 'react'

type PropsType = {
  value: string
  setValue: Function
  placeholder?: string
  required?: boolean
  rows?: number
  minimalistic?: boolean
}

const Textarea = (props: PropsType) => {
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
      className={`${s.textarea} ${isError && s.with_error} ${minimalistic && s.minimalistic}`}
      placeholder={placeholder}
      onBlur={() => setIsTouched(true)}
    />
  )
}

export default memo(Textarea)
