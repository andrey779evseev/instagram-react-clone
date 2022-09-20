import withClassName from '@hoc/WithClassName'

const ShareIcon = () => {
  return (
    <svg
      width='24'
      height='25'
      viewBox='0 0 24 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_306_2654)'>
        <path
          d='M23.9 2.05491C23.75 1.80491 23.5 1.65491 23.25 1.65491H0.75C0.45 1.70491 0.15 1.90491 0.05 2.15491C-0.05 2.40491 0 2.75491 0.2 3.00491L8.15 10.8049L10.9 22.1049C10.95 22.4049 11.2 22.6049 11.5 22.6549H11.6C11.85 22.6549 12.1 22.5049 12.25 22.3049L23.85 2.80491C24.05 2.60491 24.05 2.30491 23.9 2.05491ZM2.6 3.20491H20.35L9 9.50491L2.6 3.20491ZM11.95 20.0049L9.75 10.8049L21.2 4.45491L11.95 20.0049Z'
          fill='#262626'
        />
      </g>
      <defs>
        <clipPath id='clip0_306_2654'>
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

export default withClassName(ShareIcon)
