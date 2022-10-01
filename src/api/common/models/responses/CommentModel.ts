import UserMiniatureModel from '@api/common/models/responses/UserMiniatureModel'

export default class CommentModel {
  constructor(obj?: Partial<CommentModel>) {
    if (obj)
      Object.assign(this, obj)
  }
  CommentId: string = ''
  PostId: string = ''
  Author: UserMiniatureModel = null!
  Text: string = ''
  CommentedAt: string = ''
}
