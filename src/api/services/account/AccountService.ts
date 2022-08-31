import {customFetch} from '@api/services/BaseService'
import {EnumHttpMethod} from '@api/common/EnumHttpMethod'
import User from '@models/user/User'
import UpdateUserRequest from '@api/services/account/models/requests/UpdateUserRequest'

export namespace AccountService {
  const controllerName = 'account'

  export const GetUser = () => {
    return customFetch<User>({
      Method: EnumHttpMethod.Get,
      Path: `${controllerName}/get-user`
    })
  }
  export const SetAvatar = (data: FormData) => {
    return customFetch<string>({
      Method: EnumHttpMethod.Put,
      Req: data,
      Path: `${controllerName}/set-avatar`,
      IsFile: true
    })
  }
  export const UpdateUser = (req: UpdateUserRequest) => {
    return customFetch<User>({
      Method: EnumHttpMethod.Put,
      Req: req,
      Path: `${controllerName}/update-user`
    })
  }
  export const CheckNickname = (value: string) => {
    return customFetch<boolean>({
      Method: EnumHttpMethod.Get,
      Path: `${controllerName}/check-nickname/${value}`,
      WithToken: false
    })
  }
}
