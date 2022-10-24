import { memo } from 'react'
import If from '@components/common/if/If'
import PostMiniatureModel from '@api/common/models/responses/PostMiniatureModel'
import PostMiniature from './PostMiniature'

type PropsType = {
	item: PostMiniatureModel[]
	size: number
}

const TriplePost = (props: PropsType) => {
	const { item, size } = props
	return (
		<div className='triple_post flex gap-[29px] mb-[29px]'>
			<If condition={!!item[0]}>
				<PostMiniature post={item[0]} size={size} />
			</If>
			<If condition={!!item[0]}>
				<PostMiniature post={item[1]} size={size} />
			</If>
			<If condition={!!item[0]}>
				<PostMiniature post={item[2]} size={size} />
			</If>
		</div>
	)
}

export default memo(TriplePost)
