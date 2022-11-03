import { EnumHttpMethod } from '@api/common/EnumHttpMethod'
import { FileTypeEnum } from '@api/common/models/enums/FileTypeEnum'
import AddCommentRequest from '@api/common/models/requests/AddCommentRequest'
import CreatePostRequest from '@api/common/models/requests/CreatePostRequest'
import LikeUnlikePostRequest from '@api/common/models/requests/LikeUnlikePostRequest'
import LikesInfoModel from '@api/common/models/responses/LikesInfoModel'
import PostModel from '@api/common/models/responses/PostModel'
import UserMiniatureModel from '@api/common/models/responses/UserMiniatureModel'
import CommentModel from '../../common/models/responses/CommentModel'
import { customFetch } from '../BaseService'
import { MediaService } from '../media/MediaService'

export namespace PostService {
	const controllerName = 'post'

	export const AddComment = (req: AddCommentRequest) => {
		return customFetch({
			Method: EnumHttpMethod.Post,
			Path: `${controllerName}/${req.PostId}/add-comment`,
			Req: { Text: req.Text },
		})
	}

	export const UnlikePost = (req: LikeUnlikePostRequest) => {
		return customFetch({
			Method: EnumHttpMethod.Post,
			Path: `${controllerName}/${req.PostId}/unlike`,
		})
	}

	export const LikePost = (req: LikeUnlikePostRequest) => {
		return customFetch({
			Method: EnumHttpMethod.Post,
			Path: `${controllerName}/${req.PostId}/like`,
		})
	}

	export const CreatePost = async (req: CreatePostRequest) => {
		const url = await MediaService.SaveImage({
			Data: req.Data,
			FileType: FileTypeEnum.PostPicture,
		})
		return customFetch({
			Method: EnumHttpMethod.Post,
			Path: `${controllerName}/create-post`,
			Req: {
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

	export const GetComments = (postId: string) => {
		return customFetch<CommentModel[]>({
			Method: EnumHttpMethod.Get,
			Path: `${controllerName}/get-comments/${postId}`,
		})
	}

	export const GetCommentsCount = (postId: string) => {
		return customFetch<number>({
			Method: EnumHttpMethod.Get,
			Path: `${controllerName}/get-comments-count/${postId}`,
		})
	}

	export const GetLikesInfo = (postId: string) => {
		return customFetch<LikesInfoModel>({
			Method: EnumHttpMethod.Get,
			Path: `${controllerName}/get-likes-info/${postId}`,
		})
	}

	export const GetAuthor = (postId: string) => {
		return customFetch<UserMiniatureModel>({
			Method: EnumHttpMethod.Get,
			Path: `${controllerName}/get-author/${postId}`,
		})
	}
}
