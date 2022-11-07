import { queryClient } from '@providers/QueryProvider'
import { rootNavigate } from 'src/Router'
import { CredentialsAtom } from '@store/atoms/AuthenticationAtom'
import { writeAtom } from './JotaiNexus'
import { SaveToLocalStorage } from './LocalStorage'

export const logout = () => {
	console.log('before clear')
	queryClient.clear()
	console.log('after clear')
	writeAtom(CredentialsAtom, null)
	SaveToLocalStorage('email', undefined)
	rootNavigate('/login')
}
