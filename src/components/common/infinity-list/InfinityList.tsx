import useScrollTop from '@hooks/UseScrollTop'
import generateUniqueId from '@utils/UniqueId'
import {
  ElementType,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef
} from 'react'

type PropsType<T> = {
  Item: ElementType
  height: number
  itemHeight: number
  items: T[]
  additionalItemsCount?: number
  itemsCount?: number
  onBottom?: Function
  loader?: JSX.Element
  paddingForItem?: number
}

const InfinityList = memo(<T extends object>(props: PropsType<T>) => {
  const {
    Item,
    height,
    itemHeight,
    items,
    onBottom,
    loader,
    additionalItemsCount = 5,
    paddingForItem = 0
  } = props
  const bottomAnchor = useRef(null)
  const { scrollTop, ref } = useScrollTop()

  useEffect(() => {
    const observer = new IntersectionObserver(bottomAnchorCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    })
    if (bottomAnchor.current) observer.observe(bottomAnchor.current)
    return () => {
      if (bottomAnchor.current) observer.unobserve(bottomAnchor.current)
      observer.disconnect()
    }
  }, [])

  const bottomAnchorCallback = useCallback(
    (enteries: IntersectionObserverEntry[]) => {
      if (onBottom && enteries[0].isIntersecting) onBottom()
    },
    [onBottom]
  )

  const totalHeight = items.length * itemHeight + (items.length - 1) * paddingForItem

  let startNode = Math.max(0, Math.floor(scrollTop / itemHeight) - additionalItemsCount)

  let visibleNodeCount = Math.ceil(height / itemHeight) + 2 * additionalItemsCount
  visibleNodeCount = Math.min(items.length - startNode, visibleNodeCount)

  const offsetY = startNode * itemHeight + startNode * paddingForItem

  const visibleChildren = useMemo(
    () =>
      new Array(visibleNodeCount).fill(null).map((_, index) => {
        const item = items[startNode + index]
        const id = generateUniqueId()
        return (
          <Item
            key={id}
            item={item}
            size={itemHeight}
            index={startNode + index}
          />
        )
      }),
    [startNode, visibleNodeCount, Item]
  )

  return (
    <div
      style={{ height }}
      className='overflow-auto mr-[-15px]'
      ref={ref as any}
    >
      <div
        className='overflow-hidden will-change-transform relative'
        style={{ height: totalHeight }}
      >
        <div
          className='will-change-transform'
          style={{ transform: `translateY(${offsetY}px)` }}
        >
          {visibleChildren}
          <div className="relative">
            <div 
              className='absolute bottom-0 left-0 w-full pt-60'
              ref={bottomAnchor}
            >
              {loader ?? <></>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default InfinityList
