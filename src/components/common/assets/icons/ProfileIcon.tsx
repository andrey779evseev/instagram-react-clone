import withClassName from '@hoc/WithClassName'
import { FC } from 'react'

const ProfileIcon: FC = () => {
	return (
		<svg
			width='16'
			height='17'
			viewBox='0 0 16 17'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<g clipPath='url(#clip0_17_129)'>
				<path
					d='M8.00266 15.8297C11.8686 15.8297 15.0027 12.6957 15.0027 8.82974C15.0027 4.96375 11.8686 1.82974 8.00266 1.82974C4.13666 1.82974 1.00266 4.96375 1.00266 8.82974C1.00266 12.6957 4.13666 15.8297 8.00266 15.8297Z'
					stroke='black'
					strokeWidth='1.33333'
					strokeMiterlimit='10'
					strokeLinecap='round'
				/>
				<path
					d='M12.5287 14.1697C12.2773 13.5348 11.8695 12.9737 11.3433 12.5384C10.8837 12.1959 10.3258 12.0109 9.75265 12.0111H6.25332C5.68016 12.0111 5.1223 12.196 4.66265 12.5384C4.1364 12.9738 3.72848 13.5349 3.47665 14.1697'
					stroke='black'
					strokeWidth='1.33333'
					strokeMiterlimit='10'
					strokeLinecap='round'
				/>
				<path
					d='M8.00401 10.0451C9.5169 10.0451 10.7433 8.81863 10.7433 7.30574C10.7433 5.79285 9.5169 4.56641 8.00401 4.56641C6.49112 4.56641 5.26468 5.79285 5.26468 7.30574C5.26468 8.81863 6.49112 10.0451 8.00401 10.0451Z'
					stroke='black'
					strokeWidth='1.33333'
					strokeMiterlimit='10'
					strokeLinecap='round'
				/>
			</g>
			<defs>
				<clipPath id='clip0_17_129'>
					<rect
						width='16'
						height='16'
						fill='white'
						transform='translate(0 0.827087)'
					/>
				</clipPath>
			</defs>
		</svg>
	)
}

export default withClassName(ProfileIcon)
