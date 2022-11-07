export default class SearchUsersRequest {
	constructor(obj?: Partial<SearchUsersRequest>) {
		if (obj) Object.assign(this, obj)
	}
	Cursor?: string
	Search?: string
	Take?: number
}
