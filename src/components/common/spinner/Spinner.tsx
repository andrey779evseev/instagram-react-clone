import { memo } from 'react'
import './Spinner.scss'

type PropsType = {}

const Spinner: React.FC<PropsType> = memo(props => {
  const {} = props
  return (
    <div className='w-full h-fit flex justify-center'>
      <div className='lds-spinner'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
})

export default Spinner
