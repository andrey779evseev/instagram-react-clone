import RightPanel from '@components/right-panel/RightPanel'
import Posts from '../../components/posts/Posts'
import StoriesMiniaturesList from '../../components/stories-miniatures/StoriesMiniaturesList'
import './Feed.scss'

const Feed: React.FC = () => {
  return (
    <div className='flex'>
      <div className='main_content'>
        <StoriesMiniaturesList/>
        <Posts/>
      </div>
      <RightPanel/>
    </div>
  )
}


export default Feed
