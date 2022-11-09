import { EnumHttpMethod } from '@api/common/EnumHttpMethod'
import LikeModel from '@api/common/models/responses/LikeModel'
import LikesInfoModel from '@api/common/models/responses/LikesInfoModel'
import { customFetch } from '../BaseService'

export namespace LikesService {
	const controllerName = 'likes'

	export const UnlikePost = (postId: string) => {
		return customFetch({
			Method: EnumHttpMethod.Post,
			Path: `${controllerName}/${postId}/unlike`,
		})
	}

	export const LikePost = (postId: string) => {
		return customFetch({
			Method: EnumHttpMethod.Post,
			Path: `${controllerName}/${postId}/like`,
		})
	}

	export const GetLikesInfo = (postId: string) => {
		return customFetch<LikesInfoModel>({
			Method: EnumHttpMethod.Get,
			Path: `${controllerName}/get-likes-info/${postId}`,
		})
	}

	export const GetLikes = (postId: string) => {
		return customFetch<LikeModel[]>({
			Method: EnumHttpMethod.Get,
			Path: `${controllerName}/get-likes/${postId}`,
		})
	}
}
