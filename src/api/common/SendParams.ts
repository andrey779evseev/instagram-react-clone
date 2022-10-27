import { EnumHttpMethod } from '@api/common/EnumHttpMethod'

export default class SendParams {
	constructor(obj?: Partial<SendParams>) {
		if (obj) Object.assign(this, obj)
	}
	Method: EnumHttpMethod = EnumHttpMethod.Get
	Path: string = ''
	Req?: unknown
	WithToken?: boolean = true
	QueryParams?: Record<string, unknown> | object
}
