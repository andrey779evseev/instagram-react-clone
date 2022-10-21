export default class CreatePostRequest {
	constructor(obj?: Partial<CreatePostRequest>) {
		if (obj) Object.assign(this, obj)
	}
	Data: FormData
	Description: string
}
