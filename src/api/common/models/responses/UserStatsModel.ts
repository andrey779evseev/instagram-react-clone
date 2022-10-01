export default class UserStatsModel {
  constructor(obj?: Partial<UserStatsModel>) {
    if(obj)
      Object.assign(this, obj)
  }
  FollowersCount: number = 0
  FollowingCount: number = 0
  PostsCount: number = 0
}
