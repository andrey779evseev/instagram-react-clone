export default class ChangePasswordRequest {
	constructor(obj?: Partial<ChangePasswordRequest>) {
		if (obj) Object.assign(this, obj)
	}
	OldPassword: string
	NewPassword: string
}
