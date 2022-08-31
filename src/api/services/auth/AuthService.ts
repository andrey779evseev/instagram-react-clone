import LoginRequest from '@api/services/auth/models/requests/LoginRequest'
import AuthenticationResponse from '@api/services/auth/models/responses/AuthenticationResponse'
import RevokeRequest from '@api/services/auth/models/requests/RevokeRequest'
import RegisterRequest from '@api/services/auth/models/requests/RegisterRequest'
import {customFetch} from '@api/services/BaseService'
import {EnumHttpMethod} from '@api/common/EnumHttpMethod'
import RefreshTokenRequest from '@api/services/auth/models/requests/RefreshTokenRequest'
import ChangePasswordRequest from '@api/services/auth/models/requests/ChangePasswordRequest'
import GoogleLoginRequest from './models/requests/GoogleLoginRequest'

export namespace AuthService {
  const controllerName = 'auth'

  export const Login = (req: LoginRequest) => {
    return customFetch<AuthenticationResponse>({
      Method: EnumHttpMethod.Post,
      Path: `${controllerName}/login`,
      Req: req,
      WithToken: false
    })
  }
  export const GoogleLogin = (req: GoogleLoginRequest) => {
    return customFetch<AuthenticationResponse>({
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
    return customFetch<AuthenticationResponse>({
      Method: EnumHttpMethod.Post,
      Path: `${controllerName}/refresh-token`,
      Req: req,
      WithToken: false,
    })
  }
  export const Register = (req: RegisterRequest) => {
    return customFetch<AuthenticationResponse>({
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
