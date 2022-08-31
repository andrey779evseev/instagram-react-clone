export default class DropdownItem {
  constructor(obj?: Partial<DropdownItem>) {
    if(obj)
      Object.assign(this, obj)
  }
  Name: string = ''
  Image: string = ''
  IsDivider: boolean = false
  Callback: Function = () => {}
  IsLoading: boolean = false
  CloseAfterClick: boolean = true
}
