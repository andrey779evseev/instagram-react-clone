export default class GetMiniaturesRequest {
	constructor(obj?: Partial<GetMiniaturesRequest>) {
		if (obj) Object.assign(this, obj)
	}
	Cursor: string | null = null
	Take?: number = 25
}
