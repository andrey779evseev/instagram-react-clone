import { memo } from 'react'
import Avatar, { EnumAvatarSize } from '@components/common/avatar/Avatar'
import UserExtendedModel from '@api/common/models/user/UserExtendedModel'

type PropsType = {
	user: UserExtendedModel
	goToProfile: (userId: string) => void
	isShowButton: boolean
}

const SearchPopupItem = (props: PropsType) => {
	const { user, goToProfile, isShowButton } = props
	return (
		<div
			key={user.Id}
			className={`flex items-center cursor-pointer mb-2 ${
				!isShowButton && 'last:mb-0'
			}`}
			onClick={() => goToProfile(user.Id)}
		>
			<Avatar src={user.Avatar} size={EnumAvatarSize.Big} />
			<div className='flex flex-col justify-between flex-1 ml-2'>
				<div className='font-semibold'>{user.Nickname}</div>
				<div className='text-gray50'>{user.Name}</div>
			</div>
		</div>
	)
}

export default memo(SearchPopupItem)
