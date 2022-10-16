import { memo } from 'react'
import ImageBox from '@components/common/image-box/ImageBox'
import StoryMiniatureModel from '@models/story-miniature/StoryMiniatureModel'
import s from './StoryMiniatureItem.module.scss'

type PropsType = {
	story: StoryMiniatureModel
}

const StoryMiniatureItem = (props: PropsType) => {
	const { story } = props
	return (
		<div className={s.story_item}>
			<ImageBox image={story.Cover} />
			<div className={s.story_name}>{story.Name}</div>
		</div>
	)
}

export default memo(StoryMiniatureItem)
