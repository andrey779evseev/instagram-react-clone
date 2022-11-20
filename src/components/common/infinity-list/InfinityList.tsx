import {
	ElementType,
	memo,
	useCallback,
	useEffect,
	useMemo,
	useRef,
} from 'react'
import useScrollTop from '@hooks/UseScrollTop'
import If from '../if/If'

type PropsType<T> = {
	Item: ElementType
	height: number
	itemHeight: number
	items: T[]
	additionalItemsCount?: number
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

	const maxItemsOnScreen = useMemo(
		() => Math.ceil(height / itemHeight) + 2 * additionalItemsCount,
		[height, itemHeight, additionalItemsCount]
	)

	const visibleNodeCount = useMemo(() => {
		return Math.min(items.length - startNode, maxItemsOnScreen)
	}, [
		height,
		itemHeight,
		additionalItemsCount,
		items,
		startNode,
		maxItemsOnScreen,
	])

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
				className='relative will-change-transform'
				style={{ height: totalHeight }}
			>
				<div
					className='will-change-transform'
					style={{ transform: `translateY(${offsetY}px)` }}
				>
					{visibleChildren}
					<div className='relative'>
						<If
							condition={
								items.length >= maxItemsOnScreen &&
								items.length !== 0 &&
								visibleNodeCount !== 0
							}
						>
							<div
								className='absolute bottom-0 left-0 -z-10 w-full pt-96'
								ref={bottomAnchor}
							/>
						</If>
					</div>
				</div>
			</div>
			<div className='mt-6'>{loader ?? <></>}</div>
		</>
	)
}

export default memo(InfinityList)
