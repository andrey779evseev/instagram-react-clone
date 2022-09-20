import withClassName from '@hoc/WithClassName'

const SearchIcon = () => {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12.6667 7.00001C12.6667 8.12077 12.3343 9.21636 11.7117 10.1482C11.089 11.0801 10.204 11.8064 9.16854 12.2353C8.13309 12.6642 6.99371 12.7764 5.89449 12.5578C4.79526 12.3391 3.78556 11.7994 2.99306 11.0069C2.20056 10.2145 1.66086 9.20475 1.44221 8.10552C1.22356 7.0063 1.33578 5.86692 1.76468 4.83147C2.19358 3.79602 2.91989 2.91101 3.85177 2.28835C4.78364 1.66569 5.87924 1.33334 7 1.33334C8.50289 1.33334 9.94423 1.93037 11.0069 2.99307C12.0696 4.05578 12.6667 5.49712 12.6667 7.00001Z'
        stroke='#8E8E8E'
        strokeWidth='1.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M11.0073 11.0073L14.6667 14.6667'
        stroke='#8E8E8E'
        strokeWidth='1.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default withClassName(SearchIcon)
