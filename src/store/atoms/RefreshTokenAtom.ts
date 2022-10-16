import { atom } from 'jotai'
import { CredentialsAtom } from '@store/atoms/AuthenticationAtom'

export const RefreshTokenAtom = atom<string | null>((get) => {
	const credentials = get(CredentialsAtom)
	if (credentials !== null) return credentials.RefreshToken
	return null
})
