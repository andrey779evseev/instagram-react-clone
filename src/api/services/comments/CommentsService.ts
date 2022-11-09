import { EnumHttpMethod } from '@api/common/EnumHttpMethod'
import AddCommentRequest from '@api/common/models/requests/AddCommentRequest'
import CommentMiniatureModel from '@api/common/models/responses/CommentMiniatureModel'
import CommentModel from '../../common/models/responses/CommentModel'
import { customFetch } from '../BaseService'

export namespace CommentsService {
	const controllerName = 'comments'

	export const AddComment = (req: AddCommentRequest) => {
		return customFetch({
			Method: EnumHttpMethod.Post,
			Path: `${controllerName}/${req.PostId}/add-comment`,
			Body: { Text: req.Text },
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
