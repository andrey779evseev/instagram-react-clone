export default class CommentMiniatureModel {
	constructor(obj?: Partial<CommentMiniatureModel>) {
		if (obj) Object.assign(this, obj)
	}
	Id: string
	PostId: string
	AuthorName: string
	Text: string
}
