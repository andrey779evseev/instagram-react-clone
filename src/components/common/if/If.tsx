import {memo, PropsWithChildren} from 'react'


type PropsType = PropsWithChildren<{
  condition: boolean
}>

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
