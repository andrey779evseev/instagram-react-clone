export default class UserMiniature {
  constructor(obj?: Partial<UserMiniature>) {
    if (obj)
      Object.assign(this, obj)
  }
  Id: string = ''
  Nickname: string = ''
  Avatar: string = ''
} 
