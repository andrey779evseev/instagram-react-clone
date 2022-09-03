import './StoriesMiniaturesList.scss'
import sliderArrow from '@assets/icons/header-icons/slider-arrow.svg'
import {useMemo, useState} from 'react'
import stories from './stories.json'
import StoryMiniatureItem from './stories-miniature-item/StoryMiniatureItem'


const StoriesMiniaturesList = () => {
  const [onScreenFullyCount] = useState(5)
  const [leftScroll, setLeftScroll] = useState(0)

  const hasRightScroll = useMemo(() => {
    const scrolledToLeftCount = leftScroll/94
    const rest = stories.length - scrolledToLeftCount - onScreenFullyCount
    return Math.floor(rest) > 0
  }, [leftScroll, stories, onScreenFullyCount])

  const hasLeftScroll = useMemo(() => leftScroll !== 0, [leftScroll])

  const scrollToRight = () => {
    const scrolledToLeftCount = leftScroll/94
    const restStories = stories.length - scrolledToLeftCount - onScreenFullyCount
    const extraLeft = leftScroll === 0 ? 14 : 0
    if(restStories >= 5)
      setLeftScroll(5*94+extraLeft)
    else if (restStories > 0)
      setLeftScroll(stories.length*94 + extraLeft - (stories.length > 6 ? 6*94 : 0) + 14)
  }

  const scrollToLeft = () => {
    const scrolledToLeftCount = leftScroll/94
    if(scrolledToLeftCount >= 5)
      setLeftScroll(leftScroll - 5*94)
    else if(scrolledToLeftCount < 5)
      setLeftScroll(0)
  }

  return (
    <div className='stories_list'>
      <div className={`slider_arrow_container left ${hasLeftScroll ? 'show' : ''}`} onClick={scrollToLeft}>
        <img src={sliderArrow} className='slider_arrow' />
      </div>
      <div 
        className='scrollable' 
        style={{
          left: -leftScroll + 'px'
        }}
      >
        {stories.map((story, i) => <StoryMiniatureItem story={story} key={i}/>)}
      </div>
      <div className={`slider_arrow_container right ${hasRightScroll ? 'show' : ''}`} onClick={scrollToRight}>
        <img src={sliderArrow} className='slider_arrow' />
      </div>
    </div>
  )
}

export default StoriesMiniaturesList
