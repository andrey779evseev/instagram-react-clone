import { queryClient } from '@providers/QueryProvider'
import { CredentialsAtom } from '@store/atoms/AuthenticationAtom'
import { rootNavigate } from '../Router'
import { writeAtom } from './JotaiNexus'
import { SaveToLocalStorage } from './LocalStorage'

export const logout = () => {
	queryClient.clear()
	writeAtom(CredentialsAtom, null)
	SaveToLocalStorage('email', undefined)
	rootNavigate('/login')
}
