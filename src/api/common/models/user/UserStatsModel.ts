export default class UserStatsModel {
	constructor(obj?: Partial<UserStatsModel>) {
		if (obj) Object.assign(this, obj)
	}
	FollowersCount: number
	FollowingCount: number
	PostsCount: number
}
