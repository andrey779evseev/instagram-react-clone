export default class UserModel {
	constructor(obj?: Partial<UserModel>) {
		if (obj) Object.assign(this, obj)
	}
	Nickname: string
	Name: string
	Id: string
	Avatar: string
}
