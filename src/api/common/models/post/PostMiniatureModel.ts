export default class PostMiniatureModel {
	constructor(obj?: Partial<PostMiniatureModel>) {
		if (obj) Object.assign(this, obj)
	}
	Id: string
	Photo: string
	PostedAt: string
	LikesCount: number
	CommentsCount: number
}
