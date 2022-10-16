import { memo } from 'react'

type PropsType = {
	count?: number
}

const LikesFormatter = (props: PropsType) => {
	const { count = 10000 } = props

	return (
		<span>
			{new Intl.NumberFormat(undefined, {
				notation: 'compact',
			}).format(count)}
			&nbsp;
			{count === 1 ? 'like' : 'likes'}
		</span>
	)
}

export default memo(LikesFormatter)
