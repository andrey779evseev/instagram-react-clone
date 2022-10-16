import UserMiniatureModel from '@api/common/models/responses/UserMiniatureModel'
import LikesInfoModel from './LikesInfoModel'

export default class PostDetailModel {
	constructor(obj?: Partial<PostDetailModel>) {
		if (obj) Object.assign(this, obj)
	}
	Id: string
	Author: UserMiniatureModel
	Description: string
	Photo: string
	PostedAt: string
	LikesInfo: LikesInfoModel
}
