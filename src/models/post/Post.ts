export default class PostModel {
  constructor(obj?: Partial<PostModel>) {
    if(obj)
      Object.assign(this, obj)
  }
  AuthorName: string = ''
  AuthorAvatar: string = ''
  PostImage: string = ''
  LikesCount: number = 0
  Description: string = ''
  Date: string | Date = ''
}