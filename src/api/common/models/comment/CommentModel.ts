import UserMiniatureModel from '../user/UserMiniatureModel'

export default class CommentModel {
	constructor(obj?: Partial<CommentModel>) {
		if (obj) Object.assign(this, obj)
	}
	CommentId: string
	PostId: string
	Author: UserMiniatureModel
	Text: string
	CommentedAt: string
}
