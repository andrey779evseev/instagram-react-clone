import { useQuery } from '@tanstack/react-query'
import { EnumHttpMethod } from '@api/common/EnumHttpMethod'
import CommentMiniatureModel from '@api/common/models/comment/CommentMiniatureModel'
import CommentModel from '@api/common/models/comment/CommentModel'
import AddCommentRequest from '@api/common/models/requests/AddCommentRequest'
import { customFetch } from '../BaseService'

const controllerName = 'comments'

export const AddPostCommentAsync = (req: AddCommentRequest) => {
	return customFetch({
		Method: EnumHttpMethod.Post,
		Path: `${controllerName}/add-comment/${req.PostId}`,
		Body: req.Text,
	})
}

const GetCommentsAsync = (postId: string) => {
	return customFetch<CommentModel[]>({
		Method: EnumHttpMethod.Get,
		Path: `${controllerName}/get-comments/${postId}`,
	})
}
export const usePostCommentsQuery = (postId: string) => {
	return useQuery({
		queryKey: ['comments', { post: postId }],
		queryFn: () => GetCommentsAsync(postId),
	})
}

const GetCommentsCountAsync = (postId: string) => {
	return customFetch<number>({
		Method: EnumHttpMethod.Get,
		Path: `${controllerName}/get-comments-count/${postId}`,
	})
}
export const usePostCommentsCountQuery = (postId: string) => {
	return useQuery({
		queryKey: ['comments-count', { post: postId }],
		queryFn: () => GetCommentsCountAsync(postId),
	})
}

const GetFirstCommentAsync = (postId: string) => {
	return customFetch<CommentMiniatureModel>({
		Method: EnumHttpMethod.Get,
		Path: `${controllerName}/get-first-comment/${postId}`,
	})
}
export const usePostFirstCommentQuery = (postId: string) => {
	return useQuery({
		queryKey: ['first-comment', { post: postId }],
		queryFn: () => GetFirstCommentAsync(postId),
	})
}
