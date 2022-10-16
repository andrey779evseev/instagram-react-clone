import withClassName from '@hoc/WithClassName'

const SliderArrowIcon = () => {
	return (
		<svg
			width='30'
			height='31'
			viewBox='0 0 30 31'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<g filter='url(#filter0_d_306_2620)'>
				<g clipPath='url(#clip0_306_2620)'>
					<rect x='4' y='2.15491' width='22' height='22' rx='11' fill='white' />
					<path
						d='M10.6456 20.4882C10.6456 20.3049 10.6915 20.1216 10.829 19.9841L17.704 13.1549L10.829 6.32573C10.554 6.05073 10.554 5.63823 10.829 5.36323C11.104 5.08823 11.5165 5.08823 11.7915 5.36323L19.1248 12.6966C19.3998 12.9716 19.3998 13.3841 19.1248 13.6591L11.7915 20.9924C11.5165 21.2674 11.104 21.2674 10.829 20.9924C10.6915 20.8549 10.6456 20.6716 10.6456 20.4882Z'
						fill='#8E8E8E'
					/>
				</g>
			</g>
			<defs>
				<filter
					id='filter0_d_306_2620'
					x='0'
					y='0.154907'
					width='30'
					height='30'
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood floodOpacity='0' result='BackgroundImageFix' />
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset dy='2' />
					<feGaussianBlur stdDeviation='2' />
					<feComposite in2='hardAlpha' operator='out' />
					<feColorMatrix
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
					/>
					<feBlend
						mode='normal'
						in2='BackgroundImageFix'
						result='effect1_dropShadow_306_2620'
					/>
					<feBlend
						mode='normal'
						in='SourceGraphic'
						in2='effect1_dropShadow_306_2620'
						result='shape'
					/>
				</filter>
				<clipPath id='clip0_306_2620'>
					<rect x='4' y='2.15491' width='22' height='22' rx='11' fill='white' />
				</clipPath>
			</defs>
		</svg>
	)
}

export default withClassName(SliderArrowIcon)
