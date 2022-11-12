import { EnumHttpMethod } from '@api/common/EnumHttpMethod'
import CommentMiniatureModel from '@api/common/models/comment/CommentMiniatureModel'
import CommentModel from '@api/common/models/comment/CommentModel'
import AddCommentRequest from '@api/common/models/requests/AddCommentRequest'
import { customFetch } from '../BaseService'

export namespace CommentsService {
	const controllerName = 'comments'

	export const AddComment = (req: AddCommentRequest) => {
		return customFetch({
			Method: EnumHttpMethod.Post,
			Path: `${controllerName}/add-comment/${req.PostId}`,
			Body: req.Text,
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

	export const GetFirstComment = (postId: string) => {
		return customFetch<CommentMiniatureModel>({
			Method: EnumHttpMethod.Get,
			Path: `${controllerName}/get-first-comment/${postId}`,
		})
	}
}
