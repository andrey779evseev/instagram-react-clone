import {memo} from 'react'


type PropsType = {
  message: string | string[]
}

const Success = memo((props: PropsType) => {
  const {message} = props
  if(!message || message === '')
    return <></>
  return (
    <div className='mt-2.5'>
      <div className='w-full text-center text-green text-xs mt-[10px] px-5'>
        {message}
      </div>
    </div>
  )
})


export default Success
