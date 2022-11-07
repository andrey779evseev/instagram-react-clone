import { EnumHttpMethod } from '@api/common/EnumHttpMethod'
import GetFeedRequest from '@api/common/models/requests/GetFeedRequest'
import PostModel from '@api/common/models/responses/PostModel'
import GetMiniaturesRequest from '../../common/models/requests/GetMiniaturesRequest'
import PostMiniatureModel from '../../common/models/responses/PostMiniatureModel'
import { customFetch } from '../BaseService'

export namespace PostsService {
	const controllerName = 'posts'

	export const GetMiniatures = (req: GetMiniaturesRequest) => {
		return customFetch<PostMiniatureModel[]>({
			Method: EnumHttpMethod.Get,
			Path: `${controllerName}/get-miniatures/${req.UserId}`,
			QueryParams: {
				Take: req.Take,
				Cursor: req.Cursor,
			},
		})
	}

	export const GetFeed = (req: GetFeedRequest) => {
		return customFetch<PostModel[]>({
			Method: EnumHttpMethod.Get,
			Path: `${controllerName}/get-feed`,
			QueryParams: req,
		})
	}
}
