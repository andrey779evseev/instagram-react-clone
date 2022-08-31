import {memo} from 'react'
import './Error.scss'


type PropsType = {
  error: string | string[]
}

const Error: React.FC<PropsType> = memo((props) => {
  const {error} = props
  if(!error || error === '')
    return <></>
  return (
    <div className='mt-2.5'>
      {
        typeof error === 'string' ?
        <div className='error_text'>
          {error}
        </div> :
        <>
          {
            error.map((err, i) => (
              <div className='error_text without_margin' key={err}>
                {i + 1}) {err}
              </div>
            ))
          }
        </>
      }
    </div>
  )
})


export default Error
