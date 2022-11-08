import { EnumHttpMethod } from '@api/common/EnumHttpMethod'
import { FileTypeEnum } from '@api/common/models/enums/FileTypeEnum'
import SetAvatarRequest from '@api/common/models/requests/SetAvatarRequest'
import UpdateUserRequest from '@api/common/models/requests/UpdateUserRequest'
import { customFetch } from '@api/services/BaseService'
import ExpandedUserModel from '@models/user/ExpandedUserModel'
import User from '@models/user/User'
import UserStatsModel from '../../common/models/responses/UserStatsModel'
import { MediaService } from '../media/MediaService'

export namespace UserService {
	const controllerName = 'user'

	export const GetCurrentUser = () => {
		return customFetch<User>({
			Method: EnumHttpMethod.Get,
			Path: `${controllerName}/get-current-user`,
		})
	}
	export const GetUser = (userId: string) => {
		return customFetch<ExpandedUserModel>({
			Method: EnumHttpMethod.Get,
			Path: `${controllerName}/get-user/${userId}`,
		})
	}
	export const SetAvatar = async (req: SetAvatarRequest) => {
		const url = await MediaService.SaveImage({
			Data: req.Data,
			FileType: FileTypeEnum.Avatar,
		})
		return customFetch<string>({
			Method: EnumHttpMethod.Put,
			Body: { Url: url },
			Path: `${controllerName}/set-avatar`,
		})
	}
	export const UpdateUser = (req: UpdateUserRequest) => {
		return customFetch<User>({
			Method: EnumHttpMethod.Put,
			Body: req,
			Path: `${controllerName}/update-user`,
		})
	}
	export const CheckNickname = (value: string) => {
		return customFetch<boolean>({
			Method: EnumHttpMethod.Get,
			Path: `${controllerName}/check-nickname/${value}`,
			WithToken: false,
		})
	}
	export const GetStats = (userId: string) => {
		return customFetch<UserStatsModel>({
			Method: EnumHttpMethod.Get,
			Path: `${controllerName}/get-stats/${userId}`,
		})
	}
}
