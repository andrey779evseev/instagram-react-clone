export default class UserExtendedModel {
	constructor(obj?: Partial<UserExtendedModel>) {
		if (obj) Object.assign(this, obj)
	}
	Nickname: string
	Name: string
	Id: string
	Avatar: string
}
