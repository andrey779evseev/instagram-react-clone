import { FileTypeEnum } from '../enums/FileTypeEnum'

export default class SaveImageRequest {
	constructor(obj?: Partial<SaveImageRequest>) {
		if(obj)
			Object.assign(this, obj)
	}
	FileType: FileTypeEnum
	Data: FormData
}