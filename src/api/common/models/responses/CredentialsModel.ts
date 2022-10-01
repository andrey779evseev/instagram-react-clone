export default class AuthenticationCredentials {
  constructor(obj?: Partial<AuthenticationCredentials>) {
    if(obj)
      Object.assign(this, obj)
  }
  AccessToken: string = ''
  RefreshToken: string = ''
  AccessTokenExpiresAt: Date = new Date()
  RefreshTokenExpiresAt: Date = new Date()
}
