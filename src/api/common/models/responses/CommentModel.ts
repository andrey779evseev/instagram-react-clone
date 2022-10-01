import UserMiniature from '@api/common/models/responses/UserMiniature'

export default class CommentInfo {
  constructor(obj?: Partial<CommentInfo>) {
    if (obj)
      Object.assign(this, obj)
  }
  CommentId: string = ''
  PostId: string = ''
  Author: UserMiniature = null!
  Text: string = ''
  CommentedAt: string = ''
}
