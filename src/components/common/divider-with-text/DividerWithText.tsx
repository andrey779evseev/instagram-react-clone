import {memo} from 'react'


type PropsType = {
  text: string
}

const DividerWithText = memo((props: PropsType) => {
  const {text} = props
  return (
    <div className="flex items-center w-full mt-3 mb-[15px]">
      <div className='h-px w-full bg-gray10'></div>
      <div className='my-[6px] mx-[18px]'>{text}</div>
      <div className="h-px w-full bg-gray10"></div>
    </div>
  )
})

export default DividerWithText
