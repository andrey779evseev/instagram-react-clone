import { memo } from 'react'
import Avatar from '@components/common/avatar/Avatar'
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
			className={`mb-2 flex cursor-pointer items-center ${
				!isShowButton && 'last:mb-0'
			}`}
			onClick={() => goToProfile(user.Id)}
		>
			<Avatar src={user.Avatar} size='big' />
			<div className='ml-2 flex flex-1 flex-col justify-between'>
				<div className='font-semibold'>{user.Nickname}</div>
				<div className='text-gray50'>{user.Name}</div>
			</div>
		</div>
	)
}

export default memo(SearchPopupItem)
