import { queryClient } from '@providers/QueryProvider'
import { readAtom, writeAtom } from '@utils/JotaiNexus'
import { GetFromLocalStorage } from '@utils/LocalStorage'
import { logout } from '@utils/Logout'
import CredentialsModel from '@api/common/models/credentials/CredentialsModel'
import User from '@api/common/models/user/User'
import { RefreshTokenAsync } from '@api/services/auth/AuthService'
import { CredentialsAtom } from '@store/atoms/AuthenticationAtom'
import { IsFetchingRefreshTokenAtom } from '@store/atoms/IsFetchingRefreshToken'
import { RefreshTokenAtom } from '@store/atoms/RefreshTokenAtom'

export const refreshAccessToken = async () => {
	const refreshToken = readAtom(RefreshTokenAtom)
	const user = queryClient.getQueryData<User>(['user'])
	const email = GetFromLocalStorage<string>('email')
	if (refreshToken === null || (user === undefined && email === null)) {
		logout()
		return null
	}
	let response: CredentialsModel | null = null
	const isFetchingRefreshToken = readAtom(IsFetchingRefreshTokenAtom)
	if (isFetchingRefreshToken) return
	writeAtom(IsFetchingRefreshTokenAtom, true)
	await RefreshTokenAsync({
		RefreshToken: refreshToken,
		Email: user?.Email ?? (email as string),
	}).then((res) => {
		response = res
	})
	if (response == null) {
		logout()
		return null
	}
	writeAtom(CredentialsAtom, response)
	return (response as CredentialsModel).AccessToken
}
