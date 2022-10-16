import React, { FC } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getComponentName = (WrappedComponent: FC | React.ComponentType<any>) => {
	return (
		WrappedComponent.displayName ||
		WrappedComponent.name ||
		'defaultComponentName'
	)
}

export default getComponentName
