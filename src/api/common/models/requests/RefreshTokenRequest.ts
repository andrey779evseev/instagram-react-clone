export default class RefreshTokenRequest {
  constructor(obj?: Partial<RefreshTokenRequest>) {
    if(obj)
      Object.assign(this, obj)
  }
  RefreshToken: string = ''
  Email: string = ''
}
