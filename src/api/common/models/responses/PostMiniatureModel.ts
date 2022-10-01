export default class PostMiniature {
  constructor(obj?: Partial<PostMiniature>) {
    if(obj)
      Object.assign(this, obj)
  }
  Id: string = ''
  Photo: string = ''
  PostedAt: string = ''
  LikesCount: number = 0
  CommentsCount: number = 0
}
