import withClassName from '@hoc/WithClassName'

const OutlinedCommentIcon = () => {
  return (
    <svg
      width='24'
      height='25'
      viewBox='0 0 24 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_306_2651)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M23.75 23.2049L22.35 17.7049C23.25 16.0549 23.75 14.1549 23.75 12.1549C23.75 5.65491 18.5 0.404907 12 0.404907C5.5 0.404907 0.25 5.65491 0.25 12.1549C0.25 18.6549 5.5 23.9049 12 23.9049C14 23.9049 15.9 23.4049 17.55 22.5049L23.05 23.9049C23.45 24.0049 23.85 23.6049 23.75 23.2049ZM22.25 12.1549C22.25 14.1549 21.75 15.6549 20.95 17.1549C20.85 17.3549 20.8 17.6049 20.85 17.8549L21.9 22.0549L17.75 21.0049C17.5 20.9549 17.25 20.9549 17.05 21.1049C16.15 21.6049 14.45 22.4049 12.05 22.4049C6.35 22.4049 1.75 17.8049 1.75 12.1549C1.75 6.50491 6.35 1.90491 12 1.90491C17.65 1.90491 22.25 6.50491 22.25 12.1549Z'
          fill='#262626'
        />
      </g>
      <defs>
        <clipPath id='clip0_306_2651'>
          <rect
            width='24'
            height='24'
            fill='white'
            transform='translate(0 0.154907)'
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export default withClassName(OutlinedCommentIcon)
