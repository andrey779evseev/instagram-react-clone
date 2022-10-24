export default class LikeUnlikePostRequest {
	constructor(obj?: Partial<LikeUnlikePostRequest>) {
		if (obj) Object.assign(this, obj)
	}
	PostId: string
}
