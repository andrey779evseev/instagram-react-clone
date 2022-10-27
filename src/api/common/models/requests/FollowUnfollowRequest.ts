export default class FollowUnfollowRequest {
	constructor(obj?: Partial<FollowUnfollowRequest>) {
		if (obj) Object.assign(this, obj)
	}
	UserId: string
}
