import { useQuery } from '@tanstack/react-query'
import { EnumHttpMethod } from '@api/common/EnumHttpMethod'
import { FileTypeEnum } from '@api/common/models/enums/FileTypeEnum'
import PostModel from '@api/common/models/post/PostModel'
import CreatePostRequest from '@api/common/models/requests/CreatePostRequest'
import UserMiniatureModel from '@api/common/models/user/UserMiniatureModel'
import { customFetch } from '../BaseService'
import { SaveImageAsync } from '../media/MediaService'

const controllerName = 'post'

export const CreatePostAsync = async (req: CreatePostRequest) => {
	const url = await SaveImageAsync({
		Data: req.Data,
		FileType: FileTypeEnum.PostPicture,
	})
	return customFetch({
		Method: EnumHttpMethod.Post,
		Path: `${controllerName}/create-post`,
		Body: {
			Photo: url,
			Description: req.Description,
		},
	})
}

const GetPostAsync = (postId: string) => {
	return customFetch<PostModel>({
		Method: EnumHttpMethod.Get,
		Path: `${controllerName}/get-post/${postId}`,
	})
}
export const usePostQuery = (postId: string) => {
	return useQuery({
		queryKey: ['post', { post: postId }],
		queryFn: () => GetPostAsync(postId),
	})
}

const GetAuthorAsync = (postId: string) => {
	return customFetch<UserMiniatureModel>({
		Method: EnumHttpMethod.Get,
		Path: `${controllerName}/get-author/${postId}`,
	})
}
export const usePostAuthorQuery = (postId: string) => {
	return useQuery({
		queryKey: ['author', { post: postId }],
		queryFn: () => GetAuthorAsync(postId),
	})
}
