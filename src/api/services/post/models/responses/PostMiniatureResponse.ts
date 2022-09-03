export default class PostMiniatureResponse {
  constructor(obj?: Partial<PostMiniatureResponse>) {
    if(obj)
      Object.assign(this, obj)
  }
  Id: string = ''
  Photo: string = ''
  PostedAt!: string
}