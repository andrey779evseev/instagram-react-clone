import React from 'react'

export default class DropdownItem {
  constructor(obj?: Partial<DropdownItem>) {
    if(obj)
      Object.assign(this, obj)
  }
  Name: string = ''
  /**
   * if image is an ElementType, provided component must have 'className' prop
   */
  Image: string | React.ElementType = ''
  IsDivider: boolean = false
  Callback: Function = () => {}
  IsLoading: boolean = false
  CloseAfterClick: boolean = true
}
