export default class LikesInfo {
  constructor(obj?: Partial<LikesInfo>) {
    if (obj)
      Object.assign(this, obj)
  }
  Avatars: string[] = []
  FirstName: string = ''
  LikesCount: number = 0
}
