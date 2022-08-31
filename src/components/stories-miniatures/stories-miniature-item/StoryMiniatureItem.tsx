import {memo} from 'react'
import StoryMiniatureModel from '@models/story-miniature/StoryMiniatureModel'
import ImageBox from '@components/common/image-box/ImageBox'
import './StoryMiniatureItem.scss'

type PropsType = {
  story: StoryMiniatureModel
}

const StoryMiniatureItem: React.FC<PropsType> = memo((props) => {
  const {story} = props
  return (
    <div className='story_item'>
      <ImageBox image={story.Cover}/>
      <div className='story_name'>{story.Name}</div>
    </div>
  )
})

export default StoryMiniatureItem
