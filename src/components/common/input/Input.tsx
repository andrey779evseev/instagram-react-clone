import s from './Input.module.scss'
import { memo, useMemo, useState } from 'react'
import Error from '@components/common/error/Error'

type PropsType = {
  value: string
  setValue: Function
  placeholder?: string
  type?: string
  required?: boolean
  minimalistic?: boolean
  error?: string
  inputMode?:
    | 'text'
    | 'none'
    | 'search'
    | 'email'
    | 'tel'
    | 'url'
    | 'numeric'
    | 'decimal'
    | undefined
}

const Input = (props: PropsType) => {
  const {
    value,
    setValue,
    placeholder = '',
    type = 'text',
    required = false,
    minimalistic = false,
    error = '',
    inputMode = undefined
  } = props
  const [isTouched, setIsTouched] = useState(false)
  const isError = useMemo(() => {
    return (isTouched && required && value === '') || (!!error && error !== '')
  }, [isTouched, required, value, error])
  return (
    <div>
      <input
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={e => setValue(e.target.value)}
        className={`${s.input} ${isError && s.with_error} ${
          minimalistic && s.minimalistic
        }`}
        placeholder={placeholder}
        onBlur={() => setIsTouched(true)}
      />
      <Error error={error} />
    </div>
  )
}

export default memo(Input)
