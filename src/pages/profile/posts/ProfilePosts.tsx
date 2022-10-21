import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import InfinityList from '@components/common/infinity-list/InfinityList'
import Spinner from '@components/common/spinner/Spinner'
import TriplePost from '@components/profile/posts-miniature/TriplePost'
import PostMiniatureModel from '@api/common/models/responses/PostMiniatureModel'
import { AccountService } from '@api/services/account/AccountService'
import { PostService } from '@api/services/post/PostService'

const ProfilePosts = () => {
	const { data: user } = useQuery(['user'], AccountService.GetUser)
	const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useInfiniteQuery(
			['mini-posts', user?.Id],
			({ pageParam = null }) =>
				PostService.GetMiniatures({ Cursor: pageParam, Take: 27 }),
			{
				getNextPageParam: (lastPage) =>
					lastPage.length === 27
						? lastPage[lastPage.length - 1].PostedAt
						: undefined,
			}
		)

	const flatPosts = useMemo(() => data?.pages.flat(1) ?? [], [data])

	const tripledFlatPosts = useMemo(() => {
		const arr: PostMiniatureModel[][] = []
		for (let i = 0; i < flatPosts.length; i+=3) {
			arr.push(flatPosts.slice(i,i+3))
		}
		return arr
	}, [flatPosts])

	const windowHeight = useMemo(
		() => window.innerHeight - 60,
		[window.innerHeight]
	)

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<InfinityList
					Item={TriplePost}
					onBottom={hasNextPage ? fetchNextPage : undefined}
					loader={isFetchingNextPage ? <Spinner /> : undefined}
					height={windowHeight}
					itemHeight={290}
					items={tripledFlatPosts}
					additionalItemsCount={3}
					paddingForItem={29}
				/>
			)}
		</>
	)
}

export default ProfilePosts
