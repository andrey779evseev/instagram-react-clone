import { EnumHttpMethod } from '@api/common/EnumHttpMethod'

export default class SendParams {
	constructor(obj?: Partial<SendParams>) {
		if (obj) Object.assign(this, obj)
	}
	Method: EnumHttpMethod = EnumHttpMethod.Get
	Path: string = ''
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Req?: any = null
	WithToken?: boolean = true
	IsFile?: boolean = false
	QueryParams?: Record<string, string>
}
