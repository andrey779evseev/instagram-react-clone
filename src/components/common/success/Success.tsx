import {memo} from 'react'
import './Success.scss'


type PropsType = {
  message: string | string[]
}

const Success: React.FC<PropsType> = memo((props) => {
  const {message} = props
  if(!message || message === '')
    return <></>
  return (
    <div className='mt-2.5'>
      <div className='success_text'>
        {message}
      </div>
    </div>
  )
})


export default Success
