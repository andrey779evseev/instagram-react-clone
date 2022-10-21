import { EnumHttpMethod } from '@api/common/EnumHttpMethod'
import { FileTypeEnum } from '@api/common/models/enums/FileTypeEnum'
import CreatePostRequest from '@api/common/models/requests/CreatePostRequest'
import PostDetailModel from '@api/common/models/responses/PostDetailModel'
import GetMiniaturesRequest from '../../common/models/requests/GetMiniaturesRequest'
import CommentModel from '../../common/models/responses/CommentModel'
import PostMiniatureModel from '../../common/models/responses/PostMiniatureModel'
import { customFetch } from '../BaseService'
import { MediaService } from '../media/MediaService'

export namespace PostService {
	const controllerName = 'post'

	export const CreatePost = async (req: CreatePostRequest) => {
		const url = await MediaService.SaveImage({
			Data: req.Data,
			FileType: FileTypeEnum.PostPicture
		})
		return customFetch({
			Method: EnumHttpMethod.Post,
			Path: `${controllerName}/create-post`,
			Req: {
				Photo: url,
				Description: req.Description
			}
		})
	}

	export const GetMiniatures = (req: GetMiniaturesRequest) => {
		return customFetch<PostMiniatureModel[]>({
			Method: EnumHttpMethod.Get,
			Path: `${controllerName}/get-miniatures`,
			//hack because class can't be accepted as Record
			QueryParams: req as unknown as Record<string, unknown>,
		})
	}

	export const GetPost = (postId: string) => {
		return customFetch<PostDetailModel>({
			Method: EnumHttpMethod.Get,
			Path: `${controllerName}/get-post/${postId}`,
		})
	}

	export const GetComments = (postId: string) => {
		return customFetch<CommentModel[]>({
			Method: EnumHttpMethod.Get,
			Path: `${controllerName}/get-comments/${postId}`,
		})
	}
}
