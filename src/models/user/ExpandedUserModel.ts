export default class ExpandedUserModel {
	constructor(obj?: Partial<ExpandedUserModel>) {
		if (obj) Object.assign(this, obj)
	}
	Id: string
	Name: string
	Nickname: string
	Avatar: string
	Description: string
}
