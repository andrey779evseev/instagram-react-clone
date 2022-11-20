import { useCurrentUserQuery } from '@api/services/user/UserService'
import Avatar from '../../common/avatar/Avatar'

const AccountInfo = () => {
	const { data: user } = useCurrentUserQuery()
	return (
		<div className='flex items-center'>
			<Avatar src={user?.Avatar} />
			<div className='ml-6 flex h-full flex-col justify-around'>
				<div className='font-semibold'>{user?.Nickname}</div>
				<div className='text-gray50'>{user?.Name}</div>
			</div>
			<div className='text-cobalt ml-auto cursor-pointer text-xs font-bold'>
				Switch
			</div>
		</div>
	)
}

export default AccountInfo
