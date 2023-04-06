import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import InfinityList from '@components/common/infinity-list/InfinityList'
import Spinner from '@components/common/spinner/Spinner'
import TriplePost from '@components/profile/posts-miniature/TriplePost'
import useWindowSize from '@hooks/UseWindowSize'
import PostMiniatureModel from '@api/common/models/post/PostMiniatureModel'
import { GetMiniaturesAsync } from '@api/services/posts/PostsService'
import { useCurrentUserQuery } from '@api/services/user/UserService'

const ProfilePosts = () => {
	const { windowHeight } = useWindowSize()
	const { userId } = useParams()

	const isMyProfile = useMemo(() => userId === 'me', [userId])

	const { data: user } = useCurrentUserQuery(isMyProfile)

	const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useInfiniteQuery(
			['mini-posts', { user: userId }],
			({ pageParam = null }) =>
				GetMiniaturesAsync({
					Cursor: pageParam,
					Take: 27,
					UserId: isMyProfile ? (user?.Id as string) : userId!,
				}),
			{
				getNextPageParam: (lastPage) =>
					lastPage.length === 27
						? lastPage[lastPage.length - 1].PostedAt
						: undefined,
				enabled: !isMyProfile || !!user?.Id,
			}
		)

	const flatPosts = useMemo(() => data?.pages.flat(1) ?? [], [data])

	const tripledFlatPosts = useMemo(() => {
		const arr: PostMiniatureModel[][] = []
		for (let i = 0; i < flatPosts.length; i += 3) {
			arr.push(flatPosts.slice(i, i + 3))
		}
		return arr
	}, [flatPosts])

	const height = useMemo(() => windowHeight - 60, [windowHeight])

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<InfinityList
					Item={TriplePost}
					onBottom={hasNextPage ? fetchNextPage : undefined}
					loader={isFetchingNextPage ? <Spinner /> : undefined}
					height={height}
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
