import './PostFooterActions.scss'
import likeIcon from '@assets/icons/post/like-icon.svg'
import commentIcon from '@assets/icons/post/comment-icon.svg'
import shareIcon from '@assets/icons/post/share-icon.svg'
import bookmarkIcon from '@assets/icons/post/bookmark-icon.svg'


const PostFooterActions: React.FC = () => {
  return (
    <div className='post_actions'>
      <div className='left_action_btns'>
        <img src={likeIcon} className='post_action_btn_icon' />
        <img src={commentIcon} className='post_action_btn_icon' />
        <img src={shareIcon} className='post_action_btn_icon' />
      </div>
      <img src={bookmarkIcon} className='post_action_btn_icon' />
    </div>
  )
}


export default PostFooterActions
