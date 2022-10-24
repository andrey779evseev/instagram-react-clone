export default class AddCommentRequest {
	constructor(obj?: Partial<AddCommentRequest>) {
		if (obj) Object.assign(this, obj)
	}
	PostId: string
	Text: string
}
