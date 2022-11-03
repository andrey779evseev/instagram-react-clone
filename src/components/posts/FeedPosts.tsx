import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import InfinityList from '@components/common/infinity-list/InfinityList'
import Spinner from '@components/common/spinner/Spinner'
import useWindowSize from '@hooks/UseWindowSize'
import { PostsService } from '@api/services/posts/PostsService'
import FeedPost from './post/FeedPost'

const FeedPosts = () => {
	const { windowHeight } = useWindowSize()

	const {
		data: posts,
		isLoading,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useInfiniteQuery({
		queryKey: ['feed'],
		queryFn: ({ pageParam = null }) =>
			PostsService.GetFeed({ Cursor: pageParam, Take: 5 }),
		getNextPageParam: (lastPage) =>
			lastPage.length === 5
				? lastPage[lastPage.length - 1].PostedAt
				: undefined,
	})

	const flatPosts = useMemo(
		() => (isLoading ? [] : posts!.pages.flat()),
		[posts]
	)

	const height = useMemo(() => windowHeight - 60, [windowHeight])

	return (
		<div>
			{isLoading ? (
				<div className='py-8'>
					<Spinner full />
				</div>
			) : (
				<InfinityList
					Item={FeedPost}
					onBottom={hasNextPage ? fetchNextPage : undefined}
					loader={isFetchingNextPage ? <Spinner /> : undefined}
					height={height}
					itemHeight={700}
					items={flatPosts}
					additionalItemsCount={5}
					paddingForItem={29}
				/>
			)}
		</div>
	)
}

export default FeedPosts
