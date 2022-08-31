import {memo} from 'react'
import './Button.scss'
import LittleLoading from '@components/common/little-loading/LittleLoading'


export enum EnumButtonTheme {
  Primary = 'primary',
  Secondary = 'secondary'
}

type PropsType = {
  children?: JSX.Element | string
  width?: string
  disabled?: boolean,
  onClick?: Function
  isLoading?: boolean
  theme?: EnumButtonTheme
}

const Button: React.FC<PropsType> = memo((props) => {
  const {
    children,
    onClick,
    width = '100%',
    disabled = false,
    isLoading = false,
    theme = EnumButtonTheme.Primary
  } = props

  const click = () => {
    if(!isLoading && !disabled && onClick)
      onClick()
  }
  return (
    <button
      className={`button ${disabled ? 'disabled' : ''} ${theme}`}
      style={{width}}
      onClick={click}
    >
      {isLoading ? <LittleLoading color='white'/> : children}
    </button>
  )
})

export default Button
