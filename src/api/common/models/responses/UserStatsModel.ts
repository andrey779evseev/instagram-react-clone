export default class UserStats {
  constructor(obj?: Partial<UserStats>) {
    if(obj)
      Object.assign(this, obj)
  }
  FollowersCount: number = 0
  FollowingCount: number = 0
  PostsCount: number = 0
}
