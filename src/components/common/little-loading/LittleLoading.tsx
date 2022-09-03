import './LittleLoading.scss'
import {memo} from 'react'

type PropsType = {
  color?: string
}

const LittleLoading = memo((props: PropsType) => {
  const {color = 'gray'} = props

  return (
    <div className={`lds-ellipsis ${color}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
})

export default LittleLoading
