import { useQuery } from '@tanstack/react-query'
import { AccountService } from '@api/services/account/AccountService'
import Avatar from '../../common/avatar/Avatar'

const AccountInfo = () => {
	const { data: user } = useQuery(['user'], AccountService.GetUser)
	return (
		<div className='flex items-center'>
			<Avatar src={user?.Avatar} />
			<div className='flex flex-col justify-around h-full ml-6'>
				<div className='font-semibold'>{user?.Nickname}</div>
				<div className='text-gray50'>{user?.Name}</div>
			</div>
			<div className='text-cobalt ml-auto font-bold text-xs cursor-pointer'>
				Switch
			</div>
		</div>
	)
}

export default AccountInfo
