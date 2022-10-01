export default class CredentialsModel {
  constructor(obj?: Partial<CredentialsModel>) {
    if(obj)
      Object.assign(this, obj)
  }
  AccessToken: string = ''
  RefreshToken: string = ''
  AccessTokenExpiresAt: Date = new Date()
  RefreshTokenExpiresAt: Date = new Date()
}
