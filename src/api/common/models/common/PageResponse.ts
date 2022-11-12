export default class PageResponse<T> {
	constructor(obj?: Partial<PageResponse<T>>) {
		if (obj) Object.assign(this, obj)
	}
	HasNextPage: boolean
	Items: T[]
}
