import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { useMemo } from 'react'
import { useGoogleLogout } from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import ProfileIcon from '@components/common/assets/icons/ProfileIcon'
import SettingsIcon from '@components/common/assets/icons/SettingsIcon'
import Avatar, { EnumAvatarSize } from '@components/common/avatar/Avatar'
import Dropdown from '@components/common/dropdown/Dropdown'
import { SaveToLocalStorage } from '@utils/LocalStorage'
import { AccountService } from '@api/services/account/AccountService'
import { AuthService } from '@api/services/auth/AuthService'
import { CredentialsAtom } from '@store/atoms/AuthenticationAtom'
import { RefreshTokenAtom } from '@store/atoms/RefreshTokenAtom'
import DropdownItem from '@models/dropdown/DropdownItem'

const CurrentUser = () => {
	const { data: user } = useQuery(['user'], AccountService.GetUser)
	const qc = useQueryClient()
	const setCredentials = useUpdateAtom(CredentialsAtom)
	const refreshToken = useAtomValue(RefreshTokenAtom)
	const navigate = useNavigate()
	const revokeMutation = useMutation(AuthService.RevokeToken, {
		onSuccess: () => {
			setCredentials(null)
			qc.removeQueries(['user'])
			SaveToLocalStorage('email', undefined)
			signOut()
			navigate('/login', { replace: true })
		},
	})

	const openProfile = () => {
		navigate('/profile')
	}

	const openSettings = () => {
		navigate('/settings/edit-profile')
	}

	const logout = () => {
		revokeMutation.mutate({ RefreshToken: refreshToken! })
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
				Callback: logout,
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
