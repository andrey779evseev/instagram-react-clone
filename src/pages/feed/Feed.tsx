import Stories from '../../components/stories/Stories'
import './Feed.scss'

const Feed: React.FC = () => {
  return (
    <div className="flex">
      <div className="main_content">
        <Stories/>
      </div>
      <div className="account_info">

      </div>
    </div>
  )
}


export default Feed