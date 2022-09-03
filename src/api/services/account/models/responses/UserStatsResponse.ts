export default class UserStatsResponse {
  constructor(obj?: Partial<UserStatsResponse>) {
    if(obj)
      Object.assign(this, obj)
  }
  FollowersCount: number = 0
  FollowingCount: number = 0
  PostsCount: number = 0
}