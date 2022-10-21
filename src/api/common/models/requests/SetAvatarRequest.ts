export default class SetAvatarRequest {
	constructor(obj?: Partial<SetAvatarRequest>) {
		if(obj)
			Object.assign(this, obj)
	}
	Data: FormData
}