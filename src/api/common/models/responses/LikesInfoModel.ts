export default class LikesInfoModel {
	constructor(obj?: Partial<LikesInfoModel>) {
		if (obj) Object.assign(this, obj)
	}
	Avatars: string[]
	FirstName: string
	LikesCount: number
}
