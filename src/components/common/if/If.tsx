import {memo} from 'react'


type PropsType = {
  children: JSX.Element | string
  condition: boolean
}

const If = memo((props: PropsType) => {
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
