import {memo} from 'react'


type PropsType = {
  children: JSX.Element | string
  condition: boolean
}

const If: React.FC<PropsType> = memo((props) => {
  const {
    children,
    condition
  } = props
  return (
    <>
      {condition && children}
    </>
  )
})

export default If
