import './Stories.scss'
import sliderArrow from '../../assets/header-icons/slider-arrow.svg'
import { useEffect, useState } from 'react'
import stories from './stories.json'


const Stories: React.FC = () => {
  const [onScreenCount, setOnScreenCount] = useState(7)
  const [onScreenFullyCount, setOnScreenFullyCount] = useState(6)
  const [hasRightScroll, setHasRightScroll] = useState(false)
  const [hasLeftScroll, setHasLeftScroll] = useState(false)
  const [leftScroll, setLeftScroll] = useState(0)

  useEffect(() => {
    if(leftScroll === 0)
      setHasRightScroll(stories.length > onScreenFullyCount)
    else {
      const scrolledToLeftCount = leftScroll/94
      console.log(scrolledToLeftCount);
      
      setHasRightScroll(Math.floor(stories.length - scrolledToLeftCount) > onScreenFullyCount)
    }
  })

  const scrollToRight = () => {
    const scrolledToLeftCount = leftScroll/94
    const restStories = stories.length - scrolledToLeftCount - onScreenFullyCount
    const extraLeft = leftScroll === 0 ? 14 : 0
    if(restStories >= 5) {
      setLeftScroll(5*94+extraLeft)
      setHasLeftScroll(true)
      setHasRightScroll(restStories - 5 !== 0)
    } else if (restStories > 0) {
      setLeftScroll(stories.length*94 + extraLeft - (stories.length > 6 ? 6*94 : 0) - 30)
      setHasRightScroll(false)
      setHasLeftScroll(true)
    }
  }

  const scrollToLeft = () => {
    const scrolledToLeftCount = leftScroll/94
    if(scrolledToLeftCount >= 5) {
      setLeftScroll(leftScroll - 5*94)
      setHasLeftScroll(scrolledToLeftCount - 5 !== 0)
      setHasRightScroll(true)
    }
  }

  return (
    <div className='stories_list'>
      <div className={`slider_arrow_container left ${hasLeftScroll ? 'show' : ''}`} onClick={scrollToLeft}>
        <img src={sliderArrow} className='slider_arrow' />
      </div>
      <div 
        className="scrollable" 
        style={{
          left: -leftScroll + 'px'
        }}
      >
        {stories.map((story, i) => (
          <div className='story_item' key={i}>
            <div className='story_img_wrapper'>
              <div
                style={{ backgroundImage: `url('${story.cover}')` }}
                className='story_image'
              />
            </div>
            <div className='story_name'>{story.name}</div>
          </div>
        ))}
      </div>
      <div className={`slider_arrow_container right ${hasRightScroll ? 'show' : ''}`} onClick={scrollToRight}>
        <img src={sliderArrow} className='slider_arrow' />
      </div>
    </div>
  )
}

export default Stories
