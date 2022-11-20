import { memo } from 'react'
import SmileEmojiIcon from '@components/common/assets/icons/SmileEmojiIcon'
import Avatar from '@components/common/avatar/Avatar'
import { useCurrentUserQuery } from '@api/services/user/UserService'
import { EnumAvatarSize } from '@models/enums/EnumAvatarSize'

type PropsType = {
	value: number
	description: string
	setDescription: (value: string) => void
	symbolsCount: number
}

const CreatePostStepThree = (props: PropsType) => {
	const { description, setDescription, symbolsCount } = props

	const { data: user } = useCurrentUserQuery()

	return (
		<div className='flex w-[300px] flex-1 flex-col p-4'>
			<div className='mb-3 flex items-center'>
				<div className='border-gray50 rounded-full border'>
					<Avatar src={user?.Avatar} size={EnumAvatarSize.Small} />
				</div>
				<span className='ml-3 text-base font-semibold'>{user?.Nickname}</span>
			</div>
			<textarea
				className='placeholder:text-gray50 w-full flex-1 resize-none text-base outline-none'
				placeholder='Write a caption...'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<div className='mt-3 flex items-center justify-between'>
				<SmileEmojiIcon size={20} color='gray50' />
				<span
					className={`text-gray50 text-xs ${
						symbolsCount > 2200 && '!text-red'
					}`}
				>
					{symbolsCount}/2200
				</span>
			</div>
		</div>
	)
}

export default memo(CreatePostStepThree)
