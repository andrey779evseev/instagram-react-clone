import { queryClient } from '@providers/QueryProvider'
import { readAtom, writeAtom } from '@utils/JotaiNexus'
import { GetFromLocalStorage } from '@utils/LocalStorage'
import { logout } from '@utils/Logout'
import CredentialsModel from '@api/common/models/responses/CredentialsModel'
import { AuthService } from '@api/services/auth/AuthService'
import { CredentialsAtom } from '@store/atoms/AuthenticationAtom'
import { RefreshTokenAtom } from '@store/atoms/RefreshTokenAtom'
import User from '@models/user/User'

export const refreshAccessToken = async () => {
	const refreshToken = readAtom(RefreshTokenAtom)
	const user = queryClient.getQueryData<User>(['user'])
	const email = GetFromLocalStorage<string>('email')
	if (refreshToken === null || (user === undefined && email === null)) {
		logout()
		return null
	}
	let response: CredentialsModel | null = null
	await AuthService.RefreshToken({
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
