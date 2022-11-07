import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import If from '@components/common/if/If'
import { UserService } from '@api/services/user/UserService'
import s from './SettingsSidebarRoutes.module.scss'

const SettingsSidebarRoutes = () => {
	const { data: user } = useQuery({
		queryKey: ['user'],
		queryFn: UserService.GetCurrentUser,
	})
	const isAvailableChangePassword = useMemo(() => !user?.GoogleId, [user])
	return (
		<div className={s.sidebar_routes_container}>
			<NavLink to='edit-profile' className={s.sidebar_route}>
				Edit profile
			</NavLink>
			<If condition={isAvailableChangePassword}>
				<NavLink to='change-password' className={s.sidebar_route}>
					Change password
				</NavLink>
			</If>
		</div>
	)
}

export default SettingsSidebarRoutes
