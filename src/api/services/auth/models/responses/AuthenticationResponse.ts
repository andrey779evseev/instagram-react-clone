export default class AuthenticationResponse {
  constructor(obj?: Partial<AuthenticationResponse>) {
    if(obj)
      Object.assign(this, obj)
  }
  AccessToken: string = ''
  RefreshToken: string = ''
  AccessTokenExpiresAt: Date = new Date()
  RefreshTokenExpiresAt: Date = new Date()
}
