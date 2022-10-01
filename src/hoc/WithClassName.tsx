import getComponentName from '@utils/GetComponentName'
import { memo } from 'react'

type PropsType = {
  className?: string
}

/**
 * this HOC is mostly recommended for use with icons only (in folder src/components/assets)
 */
const withClassName = <P extends object & JSX.IntrinsicAttributes>(
  Component: React.ComponentType<P>
) => {
  const WithClassName = memo((props: Omit<P, keyof PropsType> & PropsType) => {
    const { className = '' } = props
    return (
      <div className={`${className} block`}>
        <Component {...(props as P)}/>
      </div>
    )
  })
  WithClassName.displayName = `withClassName${getComponentName(Component)}`
  return WithClassName
}


export default withClassName