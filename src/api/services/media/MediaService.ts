import { EnumHttpMethod } from '@api/common/EnumHttpMethod'
import SaveImageRequest from '@api/common/models/requests/SaveImageRequest'
import { customFetch } from '../BaseService'

const controllerName = 'media'

export const SaveImageAsync = (req: SaveImageRequest) => {
	return customFetch<string>({
		Method: EnumHttpMethod.Post,
		Body: req.Data,
		Path: `${controllerName}/save-image`,
		QueryParams: {
			fileType: req.FileType,
		},
	})
}
