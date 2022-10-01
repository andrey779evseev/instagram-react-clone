import addDotsToNumber from '@utils/AddDotsToNumber'
import {memo} from 'react'
import AddCommentForm from './add-comment-form/AddCommentForm'
import PostFooterActions from './actions/PostFooterActions'
import PostFooterDescription from './description/PostFooterDescription'

type PropsType = {
  likesCount: number
}

const PostFooter = (props: PropsType) => {
  const { likesCount } = props
  return (
    <div className='border border-gray20 border-t-0'>
      <div className='p-4'>
        <PostFooterActions/>
        <div className='font-bold mt-4'>{addDotsToNumber(likesCount)} likes</div>
        <PostFooterDescription />
        <div className='text-gray50 cursor-pointer mt-1'>View all 100 comments</div>
        <div className='text-s text-gray50 uppercase mt-1'>1 hour ago</div>
      </div>
      <AddCommentForm/>
    </div>
  )
}

export default memo(PostFooter)
