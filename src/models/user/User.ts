export default class User {
  constructor(obj?: Partial<User>) {
    if(obj)
      Object.assign(this, obj)
  }
  Id: string = ''
  Name: string = ''
  Nickname: string = ''
  Email: string = ''
  Avatar: string = ''
  Description: string = ''
  Gender: string = ''
  GoogleId?: string = ''
}
