import { useQuery } from '@tanstack/react-query'
import { EnumHttpMethod } from '@api/common/EnumHttpMethod'
import { FileTypeEnum } from '@api/common/models/enums/FileTypeEnum'
import SetAvatarRequest from '@api/common/models/requests/SetAvatarRequest'
import UpdateUserRequest from '@api/common/models/requests/UpdateUserRequest'
import ExpandedUserModel from '@api/common/models/user/ExpandedUserModel'
import User from '@api/common/models/user/User'
import UserStatsModel from '@api/common/models/user/UserStatsModel'
import { customFetch } from '@api/services/BaseService'
import { SaveImageAsync } from '../media/MediaService'

const controllerName = 'user'

export const GetCurrentUserAsync = () => {
	return customFetch<User>({
		Method: EnumHttpMethod.Get,
		Path: `${controllerName}/get-current-user`,
	})
}
export const useCurrentUserQuery = (enabled: boolean = true) => {
	return useQuery({
		queryKey: ['user'],
		queryFn: GetCurrentUserAsync,
		enabled,
	})
}

const GetUserAsync = (userId: string) => {
	return customFetch<ExpandedUserModel>({
		Method: EnumHttpMethod.Get,
		Path: `${controllerName}/get-user/${userId}`,
	})
}
export const useUserQuery = (userId: string) => {
	return useQuery({
		queryKey: ['user', { id: userId }],
		queryFn: () => GetUserAsync(userId),
	})
}

export const SetAvatarAsync = async (req: SetAvatarRequest) => {
	const url = await SaveImageAsync({
		Data: req.Data,
		FileType: FileTypeEnum.Avatar,
	})
	return customFetch<string>({
		Method: EnumHttpMethod.Put,
		Body: { Url: url },
		Path: `${controllerName}/set-avatar`,
	})
}

export const UpdateUserAsync = (req: UpdateUserRequest) => {
	return customFetch<User>({
		Method: EnumHttpMethod.Put,
		Body: req,
		Path: `${controllerName}/update-user`,
	})
}

const CheckNicknameAsync = (value: string) => {
	return customFetch<boolean>({
		Method: EnumHttpMethod.Get,
		Path: `${controllerName}/check-nickname/${value}`,
		WithToken: false,
	})
}
export const useCheckNicknameQuery = (
	nickname: string,
	enabled: boolean = false
) => {
	return useQuery({
		queryKey: ['check-nickname', nickname],
		queryFn: () => CheckNicknameAsync(nickname),
		enabled,
	})
}

const GetStatsAsync = (userId: string) => {
	return customFetch<UserStatsModel>({
		Method: EnumHttpMethod.Get,
		Path: `${controllerName}/get-stats/${userId}`,
	})
}
export const useUserStatsQuery = (userId: string, enabled: boolean = false) => {
	return useQuery({
		queryKey: ['stats', { user: userId }],
		queryFn: () => GetStatsAsync(userId),
		enabled,
	})
}
