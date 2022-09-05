import s from './PostFooterActions.module.scss'
import likeIcon from '@assets/icons/post/like-icon.svg'
import commentIcon from '@assets/icons/post/comment-icon.svg'
import shareIcon from '@assets/icons/post/share-icon.svg'
import bookmarkIcon from '@assets/icons/post/bookmark-icon.svg'


const PostFooterActions = () => {
  return (
    <div className='flex justify-between items-center mb-4'>
      <div className='flex items-center'>
        <img src={likeIcon} className={s.post_action_btn_icon} />
        <img src={commentIcon} className={s.post_action_btn_icon} />
        <img src={shareIcon} className={s.post_action_btn_icon} />
      </div>
      <img src={bookmarkIcon} className={s.post_action_btn_icon} />
    </div>
  )
}


export default PostFooterActions
