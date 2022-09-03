import { EnumHttpMethod } from '@api/common/EnumHttpMethod'
import { customFetch } from '../BaseService'
import GetMiniaturesRequest from './models/requests/GetMiniaturesRequest'
import PostMiniatureResponse from './models/responses/PostMiniatureResponse'

export namespace PostService {
  const controllerName = 'post'

  export const GetMiniatures = (req: GetMiniaturesRequest) => {
    return customFetch<PostMiniatureResponse[]>({
      Method: EnumHttpMethod.Get,
      Path: `${controllerName}/get-miniatures`,
      QueryParams: req
    })
  }
}
