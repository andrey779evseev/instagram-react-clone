import { EnumHttpMethod } from '@api/common/EnumHttpMethod'
import CredentialsModel from '@api/common/models/credentials/CredentialsModel'
import ChangePasswordRequest from '@api/common/models/requests/ChangePasswordRequest'
import LoginRequest from '@api/common/models/requests/LoginRequest'
import RefreshTokenRequest from '@api/common/models/requests/RefreshTokenRequest'
import RegisterRequest from '@api/common/models/requests/RegisterRequest'
import RevokeRequest from '@api/common/models/requests/RevokeRequest'
import { customFetch } from '@api/services/BaseService'
import GoogleLoginRequest from '../../common/models/requests/GoogleLoginRequest'

const controllerName = 'auth'

export const LoginUserAsync = (req: LoginRequest) => {
	return customFetch<CredentialsModel>({
		Method: EnumHttpMethod.Post,
		Path: `${controllerName}/login`,
		Body: req,
		WithToken: false,
	})
}

export const GoogleLoginAsync = (req: GoogleLoginRequest) => {
	return customFetch<CredentialsModel>({
		Method: EnumHttpMethod.Post,
		Path: `${controllerName}/google-login`,
		Body: req,
		WithToken: false,
	})
}
export const RevokeTokenAsync = (req: RevokeRequest) => {
	return customFetch({
		Method: EnumHttpMethod.Post,
		Path: `${controllerName}/revoke-token`,
		Body: req,
		WithToken: false,
	})
}
export const RefreshTokenAsync = (req: RefreshTokenRequest) => {
	return customFetch<CredentialsModel>({
		Method: EnumHttpMethod.Post,
		Path: `${controllerName}/refresh-token`,
		Body: req,
		WithToken: false,
	})
}
export const RegisterUserAsync = (req: RegisterRequest) => {
	return customFetch<CredentialsModel>({
		Method: EnumHttpMethod.Post,
		Path: `${controllerName}/register`,
		Body: req,
		WithToken: false,
	})
}
export const ChangeUserPasswordAsync = (req: ChangePasswordRequest) => {
	return customFetch({
		Method: EnumHttpMethod.Post,
		Path: `${controllerName}/change-password`,
		Body: req,
	})
}
