import './AddCommentForm.scss'
import emojiIcon from '@assets/icons/post/emoji-icon.svg'
import {useMemo, useState} from 'react'


const AddCommentForm = () => {
  const [commentText, setCommentText] = useState('')
  const isAvaliablePost = useMemo(() => commentText !== '', [commentText])
  return (
    <div className='add_comment_container'>
      <img src={emojiIcon} className='cursor-pointer'/>
      <input 
        type='text' 
        className='add_comment_input' 
        placeholder='Add a comment...' 
        value={commentText} 
        onChange={(e) => setCommentText(e.target.value)}
      />
      <div className={`post_btn ${isAvaliablePost ? '' : 'disabled'}`}>Post</div>
    </div>
  )
}

export default AddCommentForm
