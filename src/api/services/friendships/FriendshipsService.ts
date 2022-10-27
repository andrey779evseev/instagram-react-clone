import { EnumHttpMethod } from '@api/common/EnumHttpMethod'
import FollowUnfollowRequest from '@api/common/models/requests/FollowUnfollowRequest'
import GetSuggestionsRequest from '@api/common/models/requests/GetSuggestionsRequest'
import UserMiniatureModel from '@api/common/models/responses/UserMiniatureModel'
import { customFetch } from '../BaseService'

export namespace FriendshipsService {
	const controllerName = 'friendships'

	export const GetSuggestions = (req: GetSuggestionsRequest) => {
		return customFetch<UserMiniatureModel[]>({
			Method: EnumHttpMethod.Get,
			Path: `${controllerName}/get-suggestions`,
			QueryParams: req,
		})
	}

	export const Follow = (req: FollowUnfollowRequest) => {
		return customFetch({
			Method: EnumHttpMethod.Post,
			Path: `${controllerName}/${req.UserId}/follow`,
		})
	}

	export const Unfollow = (req: FollowUnfollowRequest) => {
		return customFetch({
			Method: EnumHttpMethod.Post,
			Path: `${controllerName}/${req.UserId}/unfollow`,
		})
	}
}
