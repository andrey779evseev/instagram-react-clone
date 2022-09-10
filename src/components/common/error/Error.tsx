import {memo} from 'react'


type PropsType = {
  error: string | string[]
}

const Error = (props: PropsType) => {
  const {error} = props
  if(!error || error === '')
    return <></>
  return (
    <div className='mt-2.5'>
      {
        typeof error === 'string' ?
        <div className='w-full text-red text-center text-xs mt-[10px] px-5'>
          {error}
        </div> :
        <>
          {
            error.map((err, i) => (
              <div className='w-full text-red text-center text-xs mt-[10px] px-5 !m-0' key={err}>
                {i + 1}) {err}
              </div>
            ))
          }
        </>
      }
    </div>
  )
}


export default memo(Error)
