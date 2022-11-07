import { useMutation, useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { useGoogleLogout } from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import ProfileIcon from '@components/common/assets/icons/ProfileIcon'
import SettingsIcon from '@components/common/assets/icons/SettingsIcon'
import Avatar, { EnumAvatarSize } from '@components/common/avatar/Avatar'
import Dropdown from '@components/common/dropdown/Dropdown'
import { logout } from '@utils/Logout'
import { AuthService } from '@api/services/auth/AuthService'
import { UserService } from '@api/services/user/UserService'
import { RefreshTokenAtom } from '@store/atoms/RefreshTokenAtom'
import DropdownItem from '@models/dropdown/DropdownItem'

const CurrentUser = () => {
	const { data: user } = useQuery({
		queryKey: ['user'],
		queryFn: UserService.GetCurrentUser,
	})
	const refreshToken = useAtomValue(RefreshTokenAtom)
	const navigate = useNavigate()
	const revokeMutation = useMutation(AuthService.RevokeToken, {
		onSuccess: () => {
			if (!!user?.GoogleId) signOut()
			logout()
		},
	})

	const openProfile = () => {
		navigate('/profile/me')
	}

	const openSettings = () => {
		navigate('/settings/edit-profile')
	}

	const dropdownItems = useMemo(
		() => [
			new DropdownItem({
				Image: ProfileIcon,
				Name: 'Profile',
				Callback: openProfile,
			}),
			new DropdownItem({
				Image: SettingsIcon,
				Name: 'Settings',
				Callback: openSettings,
			}),
			new DropdownItem({ IsDivider: true }),
			new DropdownItem({
				Name: 'Log out',
				Callback: () => revokeMutation.mutate({ RefreshToken: refreshToken! }),
				IsLoading: revokeMutation.isLoading,
				CloseAfterClick: false,
			}),
		],
		[revokeMutation]
	)

	const { signOut } = useGoogleLogout({
		clientId: import.meta.env.VITE_GOOGLE_SIGNIN_CLIENT_ID,
		cookiePolicy: 'single_host_origin',
	})

	return (
		<>
			<Dropdown items={dropdownItems}>
				<Avatar src={user?.Avatar} size={EnumAvatarSize.Small} />
			</Dropdown>
		</>
	)
}

export default CurrentUser
