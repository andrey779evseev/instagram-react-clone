import React from 'react'

export default class DropdownItemModel {
	constructor(obj?: Partial<DropdownItemModel>) {
		if (obj) Object.assign(this, obj)
	}
	Name: string
	/**
	 * if image is an ElementType, provided component must have 'className' prop
	 */
	Image: string | React.ElementType
	IsDivider: boolean = false
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	Callback: () => void = () => {}
	IsLoading: boolean = false
	CloseAfterClick: boolean = true
}
