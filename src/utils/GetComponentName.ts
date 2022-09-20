import React, { FC } from 'react';

const getComponentName = (WrappedComponent: FC | React.ComponentType<any>) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'defaultComponentName';
}

export default getComponentName