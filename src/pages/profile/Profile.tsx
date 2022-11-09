import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TableIcon from '@components/common/assets/icons/TableIcon'
import Tabs from '@components/common/tabs/Tabs'
import ProfileHeader from '@components/profile/profile-header/ProfileHeader'
import { UserService } from '@api/services/user/UserService'
import TabItem from '@models/tabs/TabItem'

const Profile = () => {
	const { userId } = useParams()
	const navigate = useNavigate()
	const tabs = useMemo(() => {
		return [new TabItem({ Name: 'posts', Route: 'posts', Icon: TableIcon })]
	}, [])

	const { data: user } = useQuery({
		queryKey: ['user'],
		queryFn: UserService.GetCurrentUser,
	})

	useEffect(() => {
		if (user?.Id === userId) navigate('/profile/me/posts')
	}, [user, userId])

	return (
		<div className='profile_container'>
			<div className='mb-11'>
				<ProfileHeader />
			</div>
			<Tabs items={tabs} />
		</div>
	)
}

export default Profile
