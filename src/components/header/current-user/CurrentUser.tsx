import { useMutation } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { useGoogleLogout } from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import ProfileIcon from '@components/common/assets/icons/ProfileIcon'
import SettingsIcon from '@components/common/assets/icons/SettingsIcon'
import Avatar from '@components/common/avatar/Avatar'
import Dropdown from '@components/common/dropdown/Dropdown'
import { logout } from '@utils/Logout'
import { RevokeTokenAsync } from '@api/services/auth/AuthService'
import { useCurrentUserQuery } from '@api/services/user/UserService'
import { RefreshTokenAtom } from '@store/atoms/RefreshTokenAtom'
import DropdownItemModel from '@models/dropdown/DropdownItemModel'

const CurrentUser = () => {
	const { data: user } = useCurrentUserQuery()
	const refreshToken = useAtomValue(RefreshTokenAtom)
	const navigate = useNavigate()
	const revokeMutation = useMutation({ mutationFn: RevokeTokenAsync, onSuccess: () => {
		if (!!user?.GoogleId) signOut()
		logout()
	} })

	const openProfile = () => {
		navigate('/profile/me/posts')
	}

	const openSettings = () => {
		navigate('/settings/edit-profile')
	}

	const dropdownItems = useMemo(
		() => [
			new DropdownItemModel({
				Image: ProfileIcon,
				Name: 'Profile',
				Callback: openProfile,
			}),
			new DropdownItemModel({
				Image: SettingsIcon,
				Name: 'Settings',
				Callback: openSettings,
			}),
			new DropdownItemModel({ IsDivider: true }),
			new DropdownItemModel({
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
				<Avatar src={user?.Avatar} size='small' />
			</Dropdown>
		</>
	)
}

export default CurrentUser
