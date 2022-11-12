import { EnumHttpMethod } from '@api/common/EnumHttpMethod'
import PageResponse from '@api/common/models/common/PageResponse'
import GetSuggestionsRequest from '@api/common/models/requests/GetSuggestionsRequest'
import SearchUsersRequest from '@api/common/models/requests/SearchUsersRequest'
import UserExtendedModel from '@api/common/models/user/UserExtendedModel'
import UserMiniatureModel from '@api/common/models/user/UserMiniatureModel'
import { customFetch } from '../BaseService'

export namespace FriendshipsService {
	const controllerName = 'friendships'

	export const GetSuggestions = (req: GetSuggestionsRequest) => {
		return customFetch<UserExtendedModel[]>({
			Method: EnumHttpMethod.Get,
			Path: `${controllerName}/get-suggestions`,
			QueryParams: req,
		})
	}

	export const SearchUsers = (req: SearchUsersRequest) => {
		return customFetch<PageResponse<UserExtendedModel>>({
			Method: EnumHttpMethod.Post,
			Path: `${controllerName}/search-users`,
			Body: req,
		})
	}

	export const Follow = (userId: string) => {
		return customFetch({
			Method: EnumHttpMethod.Post,
			Path: `${controllerName}/follow/${userId}`,
		})
	}

	export const Unfollow = (userId: string) => {
		return customFetch({
			Method: EnumHttpMethod.Post,
			Path: `${controllerName}/unfollow/${userId}`,
		})
	}

	export const GetFollowers = (userId: string) => {
		return customFetch<UserMiniatureModel[]>({
			Method: EnumHttpMethod.Get,
			Path: `${controllerName}/get-followers/${userId}`,
		})
	}

	export const GetFollowing = (userId: string) => {
		return customFetch<UserMiniatureModel[]>({
			Method: EnumHttpMethod.Get,
			Path: `${controllerName}/get-following/${userId}`,
		})
	}

	export const IsFollowed = (userId: string) => {
		return customFetch<boolean>({
			Method: EnumHttpMethod.Get,
			Path: `${controllerName}/is-followed/${userId}`,
		})
	}
}
