import { Skeleton } from '@mui/material'
import { memo, useEffect, useMemo, useState } from 'react'

type PropsType = {
  width: number
  height: number
  url: string
}

const AsyncImage = memo((props: PropsType) => {
  const {
    width,
    height,
    url
  } = props
  const [src, setSrc] = useState('')

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
     setSrc(url)
    }
    img.src = url
  }, [])

  const size = useMemo(() => {
    return {
      height: height + 'px',
      width: width + 'px'
    }
  }, [width, height])

  return (
    <div style={size}>
      {
        src ?
        <div 
          className='bg-center bg-cover' 
          style={{backgroundImage: `url('${src}')`, ...size}}
        /> :
        <Skeleton variant='rectangular' width={width} height={height}/>
      }
    </div>
  )
})

export default AsyncImage