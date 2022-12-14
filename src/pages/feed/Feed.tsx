import RightPanel from '@components/right-panel/RightPanel'
import FeedPosts from '../../components/posts/FeedPosts'
import StoriesMiniaturesList from '../../components/stories-miniatures/StoriesMiniaturesList'

const Feed = () => {
	return (
		<div className='flex justify-center'>
			<div className='mr-20 w-[470px]'>
				<StoriesMiniaturesList />
				<FeedPosts />
			</div>
			<RightPanel />
		</div>
	)
}

export default Feed
