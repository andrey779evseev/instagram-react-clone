export default class LoginRequest {
	constructor(obj?: Partial<LoginRequest>) {
		if (obj) Object.assign(this, obj)
	}
	Email: string
	Password: string
}
