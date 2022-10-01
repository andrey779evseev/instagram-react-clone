import LoginRequest from '@api/common/models/requests/LoginRequest'
import CredentialsModel from '@api/common/models/responses/CredentialsModel'
import RevokeRequest from '@api/common/models/requests/RevokeRequest'
import RegisterRequest from '@api/common/models/requests/RegisterRequest'
import {customFetch} from '@api/services/BaseService'
import {EnumHttpMethod} from '@api/common/EnumHttpMethod'
import RefreshTokenRequest from '@api/common/models/requests/RefreshTokenRequest'
import ChangePasswordRequest from '@api/common/models/requests/ChangePasswordRequest'
import GoogleLoginRequest from '../../common/models/requests/GoogleLoginRequest'

export namespace AuthService {
  const controllerName = 'auth'

  export const Login = (req: LoginRequest) => {
    return customFetch<CredentialsModel>({
      Method: EnumHttpMethod.Post,
      Path: `${controllerName}/login`,
      Req: req,
      WithToken: false
    })
  }
  export const GoogleLogin = (req: GoogleLoginRequest) => {
    return customFetch<CredentialsModel>({
      Method: EnumHttpMethod.Post,
      Path: `${controllerName}/google-login`,
      Req: req,
      WithToken: false
    })
  }
  export const RevokeToken = (req: RevokeRequest) => {
    return customFetch({
      Method: EnumHttpMethod.Post,
      Path: `${controllerName}/revoke-token`,
      Req: req,
      WithToken: false,
    })
  }
  export const RefreshToken = (req: RefreshTokenRequest) => {
    return customFetch<CredentialsModel>({
      Method: EnumHttpMethod.Post,
      Path: `${controllerName}/refresh-token`,
      Req: req,
      WithToken: false,
    })
  }
  export const Register = (req: RegisterRequest) => {
    return customFetch<CredentialsModel>({
      Method: EnumHttpMethod.Post,
      Path: `${controllerName}/register`,
      Req: req,
      WithToken: false,
    })
  }
  export const ChangePassword = (req: ChangePasswordRequest) => {
    return customFetch({
      Method: EnumHttpMethod.Post,
      Path: `${controllerName}/change-password`,
      Req: req
    })
  }
}
