import {
	ElementType,
	memo,
	useCallback,
	useEffect,
	useMemo,
	useRef,
} from 'react'
import useScrollTop from '@hooks/UseScrollTop'

type PropsType<T> = {
	Item: ElementType
	height: number
	itemHeight: number
	items: T[]
	additionalItemsCount?: number
	itemsCount?: number
	onBottom?: () => void
	loader?: JSX.Element
	paddingForItem?: number
}

const InfinityList = <T extends object>(props: PropsType<T>) => {
	const {
		Item,
		height,
		itemHeight,
		items,
		onBottom,
		loader,
		additionalItemsCount = 5,
		paddingForItem = 0,
	} = props
	const bottomAnchor = useRef(null)
	const { scrollTop } = useScrollTop(true, true)

	useEffect(() => {
		const observer = new IntersectionObserver(bottomAnchorCallback, {
			root: null,
			rootMargin: '0px',
			threshold: 0.5,
		})
		if (bottomAnchor.current) observer.observe(bottomAnchor.current)
		return () => {
			if (bottomAnchor.current) observer.unobserve(bottomAnchor.current)
			observer.disconnect()
		}
	}, [])

	const bottomAnchorCallback = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			if (onBottom && entries[0].isIntersecting) onBottom()
		},
		[onBottom]
	)

	const totalHeight =
		items.length * itemHeight + (items.length - 1) * paddingForItem

	const startNode = useMemo(
		() =>
			Math.max(
				0,
				Math.min(
					Math.max(
						0,
						Math.floor(scrollTop / itemHeight) - additionalItemsCount
					),
					items.length - (2 * additionalItemsCount + 1)
				)
			),
		[scrollTop, itemHeight, additionalItemsCount]
	)

	const visibleNodeCount = useMemo(() => {
		const value = Math.ceil(height / itemHeight) + 2 * additionalItemsCount
		return Math.min(items.length - startNode, value)
	}, [height, itemHeight, additionalItemsCount, items, startNode])

	//necessary for keeping offsetY when modals open and body became fixed
	const offsetY = useMemo(() => {
		const value = startNode * itemHeight + startNode * paddingForItem
		return value
	}, [startNode, itemHeight, paddingForItem])

	const visibleChildren = useMemo(
		() =>
			new Array(Math.min(items.length, visibleNodeCount))
				.fill(null)
				.map((_, index) => {
					const item = items[startNode + index]
					return <Item key={index} item={item} size={itemHeight} />
				}),
		[startNode, visibleNodeCount, Item, items]
	)

	return (
		<>
			<div
				className='will-change-transform relative'
				style={{ height: totalHeight }}
			>
				<div
					className='will-change-transform'
					style={{ transform: `translateY(${offsetY}px)` }}
				>
					{visibleChildren}
					<div className='relative'>
						<div
							className='absolute bottom-0 left-0 w-full pt-96 -z-10'
							ref={bottomAnchor}
						/>
					</div>
				</div>
			</div>
			<div className='mt-6'>{loader ?? <></>}</div>
		</>
	)
}

export default memo(InfinityList)
