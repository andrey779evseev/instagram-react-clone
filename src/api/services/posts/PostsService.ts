import { EnumHttpMethod } from '@api/common/EnumHttpMethod'
import PostMiniatureModel from '@api/common/models/post/PostMiniatureModel'
import PostModel from '@api/common/models/post/PostModel'
import GetFeedRequest from '@api/common/models/requests/GetFeedRequest'
import GetMiniaturesRequest from '../../common/models/requests/GetMiniaturesRequest'
import { customFetch } from '../BaseService'

const controllerName = 'posts'

export const GetMiniaturesAsync = (req: GetMiniaturesRequest) => {
	return customFetch<PostMiniatureModel[]>({
		Method: EnumHttpMethod.Get,
		Path: `${controllerName}/get-miniatures/${req.UserId}`,
		QueryParams: {
			Take: req.Take,
			Cursor: req.Cursor,
		},
	})
}

export const GetFeedAsync = (req: GetFeedRequest) => {
	return customFetch<PostModel[]>({
		Method: EnumHttpMethod.Get,
		Path: `${controllerName}/get-feed`,
		QueryParams: req,
	})
}
