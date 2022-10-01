import UserMiniature from '@api/common/models/responses/UserMiniature'
import LikesInfo from './LikesInfo'

export default class PostDetail {
  constructor(obj?: Partial<PostDetail>) {
    if (obj)
      Object.assign(this, obj)
  }
  Id: string = ''
  Author: UserMiniature = null!
  Description: string = ''
  Photo: string = ''
  PostedAt: string = ''
  LikesInfo: LikesInfo = null!
}
