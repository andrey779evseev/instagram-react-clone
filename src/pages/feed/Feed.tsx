import DetailPost from '@components/posts/detail/DetailPost'
import RightPanel from '@components/right-panel/RightPanel'
import FeedPosts from '../../components/posts/FeedPosts'
import StoriesMiniaturesList from '../../components/stories-miniatures/StoriesMiniaturesList'

const Feed = () => {
  return (
    <div className='flex'>
      {/* <DetailPost/> */}
      <div className='mr-7 w-[470px]'>
        <StoriesMiniaturesList/>
        <FeedPosts/>
      </div>
      <RightPanel/>
    </div>
  )
}


export default Feed
