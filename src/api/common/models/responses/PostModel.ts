export default class PostModel {
	constructor(obj?: Partial<PostModel>) {
		if (obj) Object.assign(this, obj)
	}
	Id: string
	Description: string
	Photo: string
	PostedAt: string
}
