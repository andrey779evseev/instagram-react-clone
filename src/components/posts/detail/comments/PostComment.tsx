import CommentModel from '@api/common/models/responses/CommentModel'
import Avatar, { EnumAvatarSize } from '@components/common/avatar/Avatar'
import { fromDateToNow } from '@utils/date/FromDateToNow'


type PropsType = {
  comment: CommentModel
  avatar: string | undefined
}

const PostComment = (props: PropsType) => {
  const {
    comment,
    avatar
  } = props
  return (
    <div className="flex items-center first:pt-0 pt-4">
      <Avatar src={avatar} size={EnumAvatarSize.Medium}/>
      <div className="ml-4">
          <div>
            <span className="font-semibold">{comment.Author?.Nickname} </span>
            {comment.Text}
          </div>
          <div className="text-xs text-gray50 mt-2">
            {fromDateToNow(comment?.CommentedAt)}
          </div>
      </div>
    </div>
  )
}

export default PostComment
