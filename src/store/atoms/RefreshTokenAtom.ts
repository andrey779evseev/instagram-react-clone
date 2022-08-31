import {CredentialsAtom} from '@store/atoms/AuthenticationAtom'
import {atom} from 'jotai'


export const RefreshTokenAtom = atom<string | null>(
  (get) => {
    const credentials = get(CredentialsAtom)
    if(credentials !== null)
      return credentials.RefreshToken
    return null
  }
)
