export default class TabItem {
  constructor(obj?: Partial<TabItem>) {
    if(obj)
      Object.assign(this, obj)
  }
  Id!: number
  Name: string = ''
  Element!: JSX.Element
}