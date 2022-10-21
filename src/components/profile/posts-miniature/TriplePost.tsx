import { memo } from 'react'
import PostMiniatureModel from '@api/common/models/responses/PostMiniatureModel'
import PostMiniature from './PostMiniature'

type PropsType = {
	item: PostMiniatureModel[]
	size: number
}

const TriplePost = (props: PropsType) => {
	const { item: items, size } = props
	return (
		<div className='triple_post flex gap-[29px] mb-[29px]'>
			{items.map((item) => (
				<PostMiniature post={item} size={size} key={item.Id} />
			))}
		</div>
	)
}

export default memo(TriplePost)
