export default class UserMiniatureModel {
  constructor(obj?: Partial<UserMiniatureModel>) {
    if (obj)
      Object.assign(this, obj)
  }
  Id: string = ''
  Nickname: string = ''
  Avatar: string = ''
} 
