import UserExtendedModel from '../user/UserExtendedModel'

export default class LikeModel {
	constructor(obj?: Partial<LikeModel>) {
		if (obj) Object.assign(this, obj)
	}
	Id: string
	PostId: string
	User: UserExtendedModel
}
