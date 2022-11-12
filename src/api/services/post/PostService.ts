import { EnumHttpMethod } from '@api/common/EnumHttpMethod'
import { FileTypeEnum } from '@api/common/models/enums/FileTypeEnum'
import PostModel from '@api/common/models/post/PostModel'
import CreatePostRequest from '@api/common/models/requests/CreatePostRequest'
import UserMiniatureModel from '@api/common/models/user/UserMiniatureModel'
import { customFetch } from '../BaseService'
import { MediaService } from '../media/MediaService'

export namespace PostService {
	const controllerName = 'post'

	export const CreatePost = async (req: CreatePostRequest) => {
		const url = await MediaService.SaveImage({
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

	export const GetPost = (postId: string) => {
		return customFetch<PostModel>({
			Method: EnumHttpMethod.Get,
			Path: `${controllerName}/get-post/${postId}`,
		})
	}

	export const GetAuthor = (postId: string) => {
		return customFetch<UserMiniatureModel>({
			Method: EnumHttpMethod.Get,
			Path: `${controllerName}/get-author/${postId}`,
		})
	}
}
