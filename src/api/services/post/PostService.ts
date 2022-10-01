import {EnumHttpMethod} from '@api/common/EnumHttpMethod'
import {customFetch} from '../BaseService'
import GetMiniaturesRequest from '../../common/models/requests/GetMiniaturesRequest'
import PostMiniatureModel from '../../common/models/responses/PostMiniatureModel'
import PostDetailModel from '@api/common/models/responses/PostDetailModel'
import CommentModel from '../../common/models/responses/CommentModel'

export namespace PostService {
  const controllerName = 'post'

  export const GetMiniatures = (req: GetMiniaturesRequest) => {
    return customFetch<PostMiniatureModel[]>({
      Method: EnumHttpMethod.Get,
      Path: `${controllerName}/get-miniatures`,
      QueryParams: req
    })
  }

  export const GetPost = (postId: string) => {
    return customFetch<PostDetailModel>({
      Method: EnumHttpMethod.Get,
      Path: `${controllerName}/get-post/${postId}`
    })
  }

  export const GetComments = (postId: string) => {
    return customFetch<CommentModel[]>({
      Method: EnumHttpMethod.Get,
      Path: `${controllerName}/get-comments/${postId}`
    })
  }
}
