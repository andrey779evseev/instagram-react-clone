import { queryClient } from '@providers/QueryProvider'
import { rootNavigate } from '@providers/RouterProvider'
import { CredentialsAtom } from '@store/atoms/AuthenticationAtom'
import { writeAtom } from './JotaiNexus'
import { SaveToLocalStorage } from './LocalStorage'

export const logout = () => {
	queryClient.removeQueries(['user'])
	writeAtom(CredentialsAtom, null)
	SaveToLocalStorage('email', undefined)
	rootNavigate('/login')
}
