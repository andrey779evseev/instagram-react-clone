import ImageCrop from '@components/common/image-crop/ImageCrop'
import RightPanel from '@components/right-panel/RightPanel'
import FeedPosts from '../../components/posts/FeedPosts'
import StoriesMiniaturesList from '../../components/stories-miniatures/StoriesMiniaturesList'

const Feed = () => {
  return (
    <div className='flex'>
      <div className='mr-7 w-[470px]'>
        <StoriesMiniaturesList/>
        <FeedPosts/>
      </div>
      <RightPanel/>
    </div>
  )
}


export default Feed
