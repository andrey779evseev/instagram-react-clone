import BookmarkIcon from '@components/common/assets/icons/BookmarkIcon'
import LikeIcon from '@components/common/assets/icons/LikeIcon'
import OutlinedCommentIcon from '@components/common/assets/icons/OutlinedCommentIcon'
import ShareIcon from '@components/common/assets/icons/ShareIcon'
import s from './PostFooterActions.module.scss'


const PostFooterActions = () => {
  return (
    <div className='flex justify-between items-center mb-4'>
      <div className='flex items-center'>
        <LikeIcon className={s.post_action_btn_icon} />
        <OutlinedCommentIcon className={s.post_action_btn_icon}/>
        <ShareIcon className={s.post_action_btn_icon}/>
      </div>
      <BookmarkIcon className={s.post_action_btn_icon} />
    </div>
  )
}


export default PostFooterActions
