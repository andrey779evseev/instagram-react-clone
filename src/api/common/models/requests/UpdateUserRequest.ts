export default class UpdateUserRequest {
  constructor(obj?: Partial<UpdateUserRequest>) {
    if(obj)
      Object.assign(this, obj)
  }
  Name: string = ''
  Nickname: string = ''
  Description: string = ''
  Email: string = ''
  Gender: string = ''
}
