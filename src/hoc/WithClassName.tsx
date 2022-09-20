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
  const WithTheme = memo((props: Omit<P, keyof PropsType> & PropsType) => {
    const { className = '' } = props
    return (
      <div className={`${className} inline-block`}>
        <Component {...(props as P)} />
      </div>
    )
  })
  WithTheme.displayName = `withClassName${getComponentName(Component)}`
  return WithTheme
}


export default withClassName