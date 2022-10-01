import {AuthService} from '@api/services/auth/AuthService'
import CredentialsModel from '@api/common/models/responses/CredentialsModel'
import User from '@models/user/User'
import {CredentialsAtom} from '@store/atoms/AuthenticationAtom'
import {RefreshTokenAtom} from '@store/atoms/RefreshTokenAtom'
import {writeAtom} from '@utils/JotaiNexus'
import {GetFromLocalStorage} from '@utils/LocalStorage'
import {logout} from '@utils/Logout'
import {atom} from 'jotai'
import {queryClient} from '@providers/QueryProvider'
import { refreshAccessToken } from '@api/utils/RefreshToken'


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
    return refreshAccessToken()
  }
)
