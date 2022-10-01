import {CredentialsAtom} from '@store/atoms/AuthenticationAtom'
import {queryClient} from '@providers/QueryProvider'
import {rootNavigate} from '@providers/RouterProvider'
import {writeAtom} from './JotaiNexus'
import {SaveToLocalStorage} from './LocalStorage'


export const logout = () => {
  queryClient.removeQueries(['user'])
  writeAtom(CredentialsAtom, null)
  SaveToLocalStorage('email', undefined)
  rootNavigate('/login')
}
