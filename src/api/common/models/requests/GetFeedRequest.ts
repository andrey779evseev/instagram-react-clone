export default class GetFeedRequest {
	constructor(obj?: Partial<GetFeedRequest>) {
		if (obj) Object.assign(this, obj)
	}
	Cursor: string | null = null
	Take?: number = 5
}
