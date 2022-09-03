import './Input.scss'
import {memo, useMemo, useState} from 'react'
import Error from '@components/common/error/Error'

type PropsType = {
  value: string
  setValue: Function
  placeholder?: string
  type?: string
  required?: boolean
  minimalistic?: boolean
  error?: string
}

const Input = memo((props: PropsType) => {
  const {
    value,
    setValue,
    placeholder = '',
    type = 'text',
    required = false,
    minimalistic = false,
    error = ''
  } = props
  const [isTouched, setIsTouched] = useState(false)
  const isError = useMemo(() => {
    return (isTouched && required && value === '') || (!!error && error !== '')
  }, [isTouched, required, value, error])
  return (
    <div>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`input ${isError && 'with_error'} ${minimalistic && 'minimalistic'}`}
        placeholder={placeholder}
        onBlur={() => setIsTouched(true)}
      />
      <Error error={error}/>
    </div>
  )
})

export default Input
