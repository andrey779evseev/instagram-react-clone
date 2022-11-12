import { EnumHttpMethod } from '@api/common/EnumHttpMethod'
import LikeModel from '@api/common/models/like/LikeModel'
import LikesInfoModel from '@api/common/models/like/LikesInfoModel'
import { customFetch } from '../BaseService'

export namespace LikesService {
	const controllerName = 'likes'

	export const UnlikePost = (postId: string) => {
		return customFetch({
			Method: EnumHttpMethod.Post,
			Path: `${controllerName}/unlike/${postId}`,
		})
	}

	export const LikePost = (postId: string) => {
		return customFetch({
			Method: EnumHttpMethod.Post,
			Path: `${controllerName}/like/${postId}`,
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
