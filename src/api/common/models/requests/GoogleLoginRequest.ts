export default class GoogleLoginRequest {
	constructor(obj?: Partial<GoogleLoginRequest>) {
		if (obj) Object.assign(this, obj)
	}
	Token: string
	Name: string
	Email: string
	Avatar?: string
}
