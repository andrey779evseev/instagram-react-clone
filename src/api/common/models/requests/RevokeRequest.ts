export default class RevokeRequest {
	constructor(obj?: Partial<RevokeRequest>) {
		if (obj) Object.assign(this, obj)
	}
	RefreshToken: string
}
