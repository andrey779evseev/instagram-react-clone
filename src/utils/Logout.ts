import {CredentialsAtom} from '@store/atoms/AuthenticationAtom'
import {queryClient, rootNavigate} from '../main'
import {writeAtom} from './JotaiNexus'
import {SaveToLocalStorage} from './LocalStorage'


export const logout = () => {
  queryClient.removeQueries(['user'])
  writeAtom(CredentialsAtom, null)
  SaveToLocalStorage('email', undefined)
  rootNavigate('/login')
}
