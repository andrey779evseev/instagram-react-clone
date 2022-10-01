export default class RegisterRequest {
  constructor(obj?: Partial<RegisterRequest>) {
    if(obj)
      Object.assign(this, obj)
  }
  Email: string = ''
  Name: string = ''
  Nickname: string = ''
  Password: string = ''
}
