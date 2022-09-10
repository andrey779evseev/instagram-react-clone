import {memo} from 'react'


type PropsType = {
  children: JSX.Element | string
  condition: boolean
}

const If = (props: PropsType) => {
  const {
    children,
    condition
  } = props
  return (
    <>
      {condition && children}
    </>
  )
}

export default memo(If)
