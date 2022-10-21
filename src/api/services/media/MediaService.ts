import { EnumHttpMethod } from '@api/common/EnumHttpMethod'
import SaveImageRequest from '@api/common/models/requests/SaveImageRequest'
import { customFetch } from '../BaseService'

export namespace MediaService {
	const controllerName = 'media'

	export const SaveImage = (req: SaveImageRequest) => {
		return customFetch<string>({
			Method: EnumHttpMethod.Post,
			Req: req.Data,
			Path: `${controllerName}/save-image`,
			QueryParams: {
				fileType: req.FileType
			}
		})
	}
}