import { atom } from 'jotai'
import { logout } from '@utils/Logout'
import { refreshAccessToken } from '@api/utils/RefreshToken'
import { CredentialsAtom } from '@store/atoms/AuthenticationAtom'

export const AccessTokenAtom = atom<Promise<string | null>>(async (get) => {
	const credentials = get(CredentialsAtom)
	if (credentials === null) {
		logout()
		return null
	}
	const tokenExpires =
		new Date(credentials.AccessTokenExpiresAt).getTime() <= new Date().getTime()
	if (!tokenExpires) return credentials.AccessToken
	return refreshAccessToken()
})
