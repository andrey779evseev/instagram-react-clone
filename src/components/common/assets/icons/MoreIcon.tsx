import useColor from '@hooks/UseColor'
import { memo } from 'react'

type PropsType = {
  color?: string
}

const MoreIcon = (props: PropsType) => {
  const { color = '#262626' } = props

  const rightColor = useColor(color)

  return (
    <svg
      width='24'
      height='25'
      viewBox='0 0 24 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12 13.6549C12.8284 13.6549 13.5 12.9833 13.5 12.1549C13.5 11.3265 12.8284 10.6549 12 10.6549C11.1716 10.6549 10.5 11.3265 10.5 12.1549C10.5 12.9833 11.1716 13.6549 12 13.6549Z'
        fill={rightColor}
      />
      <path
        d='M6.5 13.6549C7.32843 13.6549 8 12.9833 8 12.1549C8 11.3265 7.32843 10.6549 6.5 10.6549C5.67157 10.6549 5 11.3265 5 12.1549C5 12.9833 5.67157 13.6549 6.5 13.6549Z'
        fill={rightColor}
      />
      <path
        d='M17.5 13.6549C18.3284 13.6549 19 12.9833 19 12.1549C19 11.3265 18.3284 10.6549 17.5 10.6549C16.6716 10.6549 16 11.3265 16 12.1549C16 12.9833 16.6716 13.6549 17.5 13.6549Z'
        fill={rightColor}
      />
    </svg>
  )
}

export default memo(MoreIcon)