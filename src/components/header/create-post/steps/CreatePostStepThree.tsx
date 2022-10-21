import { AccountService } from '@api/services/account/AccountService'
import SmileEmojiIcon from '@components/common/assets/icons/SmileEmojiIcon'
import Avatar, { EnumAvatarSize } from '@components/common/avatar/Avatar'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'

type PropsType = {
	value: number
	description: string
	setDescription: (value: string) => void
	symbolsCount: number
}

const CreatePostStepThree = (props: PropsType) => {
	const { description, setDescription, symbolsCount } = props

	const { data: user } = useQuery(['user'], AccountService.GetUser)

	return (
		<div className='p-4 w-[300px] flex-1 flex flex-col'>
			<div className='flex items-center mb-3'>
				<div className='border border-gray50 rounded-full'>
					<Avatar src={user?.Avatar} size={EnumAvatarSize.Small} />
				</div>
				<span className='font-semibold text-base ml-3'>{user?.Nickname}</span>
			</div>
			<textarea
				className='resize-none w-full flex-1 text-base outline-none placeholder:text-gray50'
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