import Avatar from '@components/common/avatar/Avatar'
import { fromDateToNow } from '@utils/date/FromDateToNow'
import CommentModel from '@api/common/models/comment/CommentModel'
import { EnumAvatarSize } from '@models/enums/EnumAvatarSize'

type PropsType = {
	comment: CommentModel
}

const PostComment = (props: PropsType) => {
	const { comment } = props
	return (
		<div className='flex items-center first:pt-0 pt-4'>
			<Avatar src={comment.Author.Avatar} size={EnumAvatarSize.Medium} />
			<div className='ml-4'>
				<div>
					<span className='font-semibold'>{comment.Author?.Nickname} </span>
					{comment.Text}
				</div>
				<div className='text-gray50 text-xs mt-2'>
					{fromDateToNow(comment?.CommentedAt)}
				</div>
			</div>
		</div>
	)
}

export default PostComment
