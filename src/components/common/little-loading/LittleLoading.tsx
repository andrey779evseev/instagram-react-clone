import s from './LittleLoading.module.scss'
import {memo} from 'react'

type PropsType = {
  color?: 'white' | 'gray' | 'cobalt'
}

const LittleLoading = memo((props: PropsType) => {
  const {color = 'gray'} = props

  return (
    <div className={`${s.lds_ellipsis} ${s[color]}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
})

export default LittleLoading
