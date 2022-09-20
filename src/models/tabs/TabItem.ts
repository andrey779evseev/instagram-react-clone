import React from 'react'

export default class TabItem {
  constructor(obj?: Partial<TabItem>) {
    if(obj)
      Object.assign(this, obj)
  }
  Name: string = ''
  Route: string = ''
  Icon: string | React.ElementType = ''
}