import withClassName from '@hoc/WithClassName'

const BookmarkIcon = () => {
  return (
    <svg
      width='24'
      height='25'
      viewBox='0 0 24 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_306_2658)'>
        <path
          d='M21.75 24.1549C21.55 24.1549 21.35 24.0549 21.2 23.9549L12 14.6549L2.8 23.9549C2.6 24.1549 2.25 24.2549 2 24.1049C1.7 24.0049 1.5 23.7049 1.5 23.4049V0.904907C1.5 0.504907 1.85 0.154907 2.25 0.154907H21.75C22.15 0.154907 22.5 0.504907 22.5 0.904907V23.4049C22.5 23.7049 22.3 24.0049 22.05 24.1049C21.95 24.1549 21.85 24.1549 21.75 24.1549ZM12 13.1549C12.4 13.1549 12.8 13.3049 13.1 13.6049L21 21.6049V1.65491H3V21.6049L10.9 13.6049C11.2 13.3049 11.6 13.1549 12 13.1549Z'
          fill='#262626'
        />
      </g>
      <defs>
        <clipPath id='clip0_306_2658'>
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

export default withClassName(BookmarkIcon)
