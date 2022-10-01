import CommentModel from '@api/common/models/responses/CommentModel'
import PostComment from '@components/posts/detail/comments/PostComment'
import SkeletonWrapper from '@components/common/skeleton/SkeletonWrapper'
import Skeleton from '@components/common/skeleton/Skeleton'
import Avatar, {EnumAvatarSize} from '@components/common/avatar/Avatar'
import {fromDateToNow} from '@utils/date/FromDateToNow'


type PropsType = {
  comments: CommentModel[]
  isLoading: boolean
  avatar: string | undefined
}

const PostCommentsList = (props: PropsType) => {
  const {
    comments,
    isLoading,
    avatar
  } = props
  return (
    <div className="p-4 h-full overflow-y-auto">
      {
        isLoading ?
          <div className="flex items-center first:pt-0 pt-4">
            <Skeleton variant="circular" width={32} height={32}/>
            <div className="ml-4">
              <Skeleton variant="text" width='300%'/>
              <Skeleton variant="text" width='300%'/>
            </div>
          </div> :
          comments.map((comment, i) => <PostComment
              key={i}
              comment={comment}
              avatar={avatar}
            />
          )
      }
    </div>
  )
}

export default PostCommentsList
