import './PostFooter.scss'
import addDotsToNumber from '@utils/AddDotsToNumber'
import {memo} from 'react'
import AddCommentForm from './add-comment-form/AddCommentForm'
import PostFooterActions from './actions/PostFooterActions'
import PostFooterDescription from './description/PostFooterDescription'

type PropsType = {
  likesCount: number
}

const PostFooter = memo((props: PropsType) => {
  const { likesCount } = props
  return (
    <div className='post_footer'>
      <div className='post_info'>
        <PostFooterActions/>
        <div className='likes_count'>{addDotsToNumber(likesCount)} likes</div>
        <PostFooterDescription />
        <div className='show_all_comments_btn'>View all 100 comments</div>
        <div className='post_date'>1 hour ago</div>
      </div>
      <AddCommentForm/>
    </div>
  )
})

export default PostFooter
