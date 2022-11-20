import { useQuery } from '@tanstack/react-query'
import { EnumHttpMethod } from '@api/common/EnumHttpMethod'
import LikeModel from '@api/common/models/like/LikeModel'
import LikesInfoModel from '@api/common/models/like/LikesInfoModel'
import { customFetch } from '../BaseService'

const controllerName = 'likes'

export const UnlikePostAsync = (postId: string) => {
	return customFetch({
		Method: EnumHttpMethod.Post,
		Path: `${controllerName}/unlike/${postId}`,
	})
}

export const LikePostAsync = (postId: string) => {
	return customFetch({
		Method: EnumHttpMethod.Post,
		Path: `${controllerName}/like/${postId}`,
	})
}

const GetLikesInfoAsync = (postId: string) => {
	return customFetch<LikesInfoModel>({
		Method: EnumHttpMethod.Get,
		Path: `${controllerName}/get-likes-info/${postId}`,
	})
}
export const usePostLikesInfoQuery = (postId: string) => {
	return useQuery({
		queryKey: ['likes-info', { post: postId }],
		queryFn: () => GetLikesInfoAsync(postId),
	})
}

const GetLikesAsync = (postId: string) => {
	return customFetch<LikeModel[]>({
		Method: EnumHttpMethod.Get,
		Path: `${controllerName}/get-likes/${postId}`,
	})
}
export const usePostLikesQuery = (postId: string) => {
	return useQuery({
		queryKey: ['likes', { post: postId }],
		queryFn: () => GetLikesAsync(postId),
	})
}
