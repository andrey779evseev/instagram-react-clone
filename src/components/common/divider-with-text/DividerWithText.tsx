import {memo} from 'react'
import './DividerWithText.scss'


type PropsType = {
  text: string
}

const DividerWithText = memo((props: PropsType) => {
  const {text} = props
  return (
    <div className="divider_with_text">
      <div className="line"></div>
      <div className='text'>{text}</div>
      <div className="line"></div>
    </div>
  )
})

export default DividerWithText