import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import SmileEmojiIcon from '@components/common/assets/icons/SmileEmojiIcon'
import Avatar from '@components/common/avatar/Avatar'
import { UserService } from '@api/services/user/UserService'
import { EnumAvatarSize } from '@models/enums/EnumAvatarSize'

type PropsType = {
	value: number
	description: string
	setDescription: (value: string) => void
	symbolsCount: number
}

const CreatePostStepThree = (props: PropsType) => {
	const { description, setDescription, symbolsCount } = props

	const { data: user } = useQuery({
		queryKey: ['user'],
		queryFn: UserService.GetCurrentUser,
	})

	return (
		<div className='p-4 w-[300px] flex-1 flex flex-col'>
			<div className='flex items-center mb-3'>
				<div className='border-gray50 border rounded-full'>
					<Avatar src={user?.Avatar} size={EnumAvatarSize.Small} />
				</div>
				<span className='font-semibold text-base ml-3'>{user?.Nickname}</span>
			</div>
			<textarea
				className='placeholder:text-gray50 resize-none w-full flex-1 text-base outline-none'
				placeholder='Write a caption...'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<div className='flex items-center justify-between mt-3'>
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
