import { memo, useEffect, useMemo, useState } from 'react'
import Skeleton from '../skeleton/Skeleton'

type PropsType = {
  width: number
  height: number
  url: string
  rounded?: boolean
}

const AsyncImage = (props: PropsType) => {
  const {
    width,
    height,
    url,
    rounded = false
  } = props
  const [src, setSrc] = useState('')

  
  
  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setSrc(url)
    }
    img.onerror = () => {
      setSrc('')
    }
    img.src = url
  }, [url])

  useEffect(() => {
    if(src !== url)
      setSrc(url)
  }, [src])

  const styles = useMemo(() => {
    return {
      height: height + 'px',
      width: width + 'px',
      minheight: height + 'px',
      minwidth: width + 'px',
      borderRadius: rounded ? '50%' : ''
    }
  }, [width, height])

  return (
    <div style={styles}>
      {
        src ?
        <div 
          className='bg-center bg-cover' 
          style={{backgroundImage: `url('${src}')`, ...styles}}
        /> :
        <Skeleton 
          variant={rounded ? 'circular' : 'rectangular'} 
          width={width} 
          height={height}
          animation='wave'
        />
      }
    </div>
  )
}

export default memo(AsyncImage)