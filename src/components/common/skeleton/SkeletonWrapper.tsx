import { memo, PropsWithChildren } from 'react'


type PropsType = PropsWithChildren<{
  condition: boolean
  skeleton: React.ReactElement
  className?: string
}>

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