import { EnumHttpMethod } from '@api/common/EnumHttpMethod'
import ChangePasswordRequest from '@api/common/models/requests/ChangePasswordRequest'
import LoginRequest from '@api/common/models/requests/LoginRequest'
import RefreshTokenRequest from '@api/common/models/requests/RefreshTokenRequest'
import RegisterRequest from '@api/common/models/requests/RegisterRequest'
import RevokeRequest from '@api/common/models/requests/RevokeRequest'
import CredentialsModel from '@api/common/models/responses/CredentialsModel'
import { customFetch } from '@api/services/BaseService'
import GoogleLoginRequest from '../../common/models/requests/GoogleLoginRequest'

export namespace AuthService {
	const controllerName = 'auth'

	export const Login = (req: LoginRequest) => {
		return customFetch<CredentialsModel>({
			Method: EnumHttpMethod.Post,
			Path: `${controllerName}/login`,
			Body: req,
			WithToken: false,
		})
	}
	export const GoogleLogin = (req: GoogleLoginRequest) => {
		return customFetch<CredentialsModel>({
			Method: EnumHttpMethod.Post,
			Path: `${controllerName}/google-login`,
			Body: req,
			WithToken: false,
		})
	}
	export const RevokeToken = (req: RevokeRequest) => {
		return customFetch({
			Method: EnumHttpMethod.Post,
			Path: `${controllerName}/revoke-token`,
			Body: req,
			WithToken: false,
		})
	}
	export const RefreshToken = (req: RefreshTokenRequest) => {
		return customFetch<CredentialsModel>({
			Method: EnumHttpMethod.Post,
			Path: `${controllerName}/refresh-token`,
			Body: req,
			WithToken: false,
		})
	}
	export const Register = (req: RegisterRequest) => {
		return customFetch<CredentialsModel>({
			Method: EnumHttpMethod.Post,
			Path: `${controllerName}/register`,
			Body: req,
			WithToken: false,
		})
	}
	export const ChangePassword = (req: ChangePasswordRequest) => {
		return customFetch({
			Method: EnumHttpMethod.Post,
			Path: `${controllerName}/change-password`,
			Body: req,
		})
	}
}
