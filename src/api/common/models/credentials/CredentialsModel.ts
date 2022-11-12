export default class CredentialsModel {
	constructor(obj?: Partial<CredentialsModel>) {
		if (obj) Object.assign(this, obj)
	}
	AccessToken: string
	RefreshToken: string
	AccessTokenExpiresAt: Date
	RefreshTokenExpiresAt: Date
}
