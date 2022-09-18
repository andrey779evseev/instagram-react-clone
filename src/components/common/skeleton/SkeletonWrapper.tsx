import { memo } from 'react'


type PropsType = {
  condition: boolean
  skeleton: React.ReactElement
  children: JSX.Element
  className?: string
}

const SkeletonWrapper = (props: PropsType) => {
  const {
    condition,
    skeleton,
    children,
    className
  } = props
  return (
    <div className={`${className} w-full h-full`}>
      {
        !condition ?
        children :
        skeleton
      }
    </div>
  )
}

export default memo(SkeletonWrapper)