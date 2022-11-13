import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import PeoplesIcon from '@components/common/assets/icons/PeoplesIcon'
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
			{isLoading || flatPosts.length === 0 ? (
				<div className='flex-center border-gray10 flex-col w-full h-full bg-white rounded-lg border-2 mt-2 py-20'>
					{isLoading ? (
						<div className='py-8'>
							<Spinner full />
						</div>
					) : (
						<>
							<PeoplesIcon />
							<div className='text-xxl font-light pt-4 pb-1'>Posts</div>
							<div className='text-sm'>
								You'll see posts the people who you follow, here.
							</div>
						</>
					)}
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
