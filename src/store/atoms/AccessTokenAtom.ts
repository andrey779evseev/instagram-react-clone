import {AuthService} from '@api/services/auth/AuthService'
import AuthenticationResponse from '@api/services/auth/models/responses/AuthenticationResponse'
import User from '@models/user/User'
import {CredentialsAtom} from '@store/atoms/AuthenticationAtom'
import {RefreshTokenAtom} from '@store/atoms/RefreshTokenAtom'
import {writeAtom} from '@utils/JotaiNexus'
import {GetFromLocalStorage} from '@utils/LocalStorage'
import {logout} from '@utils/Logout'
import {atom} from 'jotai'
import {queryClient} from '../../main'


export const AccessTokenAtom = atom<Promise<string | null>>(
  async (get) => {
    const credentials = get(CredentialsAtom)
    if(credentials === null) {
      logout()
      return null
    }
    const tokenExpires = new Date(credentials.AccessTokenExpiresAt).getTime() <= new Date().getTime()
    if(!tokenExpires)
      return credentials.AccessToken
    const refreshToken = get(RefreshTokenAtom)
    const user = queryClient.getQueryData<User>(['user'])
    const email = GetFromLocalStorage<string>('email')
    if(refreshToken === null || (user === undefined && email === null)) {
      logout()
      return null
    }
    let response: AuthenticationResponse | null = null
    await AuthService.RefreshToken({
      RefreshToken: refreshToken,
      Email: user?.Email ?? email as string
    })
      .then(res => {
        response = res
      })
    if(response == null) {
      logout()
      return null
    }
    writeAtom(CredentialsAtom, response)
    return (response as AuthenticationResponse).AccessToken
  }
)
