import { useQuery } from '@tanstack/react-query'
import { EnumHttpMethod } from '@api/common/EnumHttpMethod'
import PageResponse from '@api/common/models/common/PageResponse'
import GetSuggestionsRequest from '@api/common/models/requests/GetSuggestionsRequest'
import SearchUsersRequest from '@api/common/models/requests/SearchUsersRequest'
import UserExtendedModel from '@api/common/models/user/UserExtendedModel'
import UserMiniatureModel from '@api/common/models/user/UserMiniatureModel'
import { customFetch } from '../BaseService'

const controllerName = 'friendships'

const GetSuggestionsAsync = (req: GetSuggestionsRequest) => {
	return customFetch<UserExtendedModel[]>({
		Method: EnumHttpMethod.Get,
		Path: `${controllerName}/get-suggestions`,
		QueryParams: req,
	})
}
export const useUsersSuggestionsQuery = (take: number) => {
	return useQuery({
		queryKey: ['suggestions', { take }],
		queryFn: () => GetSuggestionsAsync({ Take: take }),
	})
}

export const SearchUsersAsync = (req: SearchUsersRequest) => {
	return customFetch<PageResponse<UserExtendedModel>>({
		Method: EnumHttpMethod.Post,
		Path: `${controllerName}/search-users`,
		Body: req,
	})
}

export const FollowUserAsync = (userId: string) => {
	return customFetch({
		Method: EnumHttpMethod.Post,
		Path: `${controllerName}/follow/${userId}`,
	})
}

export const UnfollowUserAsync = (userId: string) => {
	return customFetch({
		Method: EnumHttpMethod.Post,
		Path: `${controllerName}/unfollow/${userId}`,
	})
}

const GetFollowersAsync = (userId: string) => {
	return customFetch<UserMiniatureModel[]>({
		Method: EnumHttpMethod.Get,
		Path: `${controllerName}/get-followers/${userId}`,
	})
}
export const useUserFollowersQuery = (userId: string) => {
	return useQuery({
		queryKey: ['followers', { user: userId }],
		queryFn: () => GetFollowersAsync(userId),
	})
}

const GetFollowingAsync = (userId: string) => {
	return customFetch<UserMiniatureModel[]>({
		Method: EnumHttpMethod.Get,
		Path: `${controllerName}/get-following/${userId}`,
	})
}
export const useUserFollowingQuery = (userId: string) => {
	return useQuery({
		queryKey: ['following', { user: userId }],
		queryFn: () => GetFollowingAsync(userId),
	})
}

const IsFollowedAsync = (userId: string) => {
	return customFetch<boolean>({
		Method: EnumHttpMethod.Get,
		Path: `${controllerName}/is-followed/${userId}`,
	})
}
export const useIsFollowedUserQuery = (
	userId: string,
	enabled: boolean = true
) => {
	return useQuery({
		queryKey: ['is-followed', { user: userId }],
		queryFn: () => IsFollowedAsync(userId),
		enabled,
	})
}
