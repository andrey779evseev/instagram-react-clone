import PostMiniatureResponse from '@api/services/post/models/responses/PostMiniatureResponse'
import { PostService } from '@api/services/post/PostService'
import If from '@components/common/if/If'
import InfinityList from '@components/common/infinity-list/InfinityList'
import LittleLoading from '@components/common/little-loading/LittleLoading'
import TriplePost from '@components/profile/posts-miniature/TriplePost'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'


const ProfilePosts = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ['mini-posts'],
      ({ pageParam = null }) =>
        PostService.GetMiniatures({ Cursor: pageParam, Take: 27 }),
      {
        getNextPageParam: lastPage =>
          lastPage.length === 27
            ? lastPage[lastPage.length - 1].PostedAt
            : undefined
      }
    )

  const flatPosts = useMemo(() => data?.pages.flat(1) ?? [], [data])

  const tripledFlatPosts = useMemo(() => {
    const arr: PostMiniatureResponse[][] = []
    for (let i = 0; i < flatPosts.length; i++) {
      if((i + 1) % 3 === 0)
        arr.push([
          flatPosts[i - 2],
          flatPosts[i - 1],
          flatPosts[i]
        ])
    }
    return arr
  }, [flatPosts])

  const loader = useMemo(() => {
    return (
      <If condition={isFetchingNextPage}>
        <div className='w-full flex justify-center my-3'>
          <LittleLoading color='cobalt' />
        </div>
      </If>
    )
  }, [isFetchingNextPage])

  return (
    <If condition={!isLoading}>
      <InfinityList
        Item={TriplePost}
        onBottom={hasNextPage ? fetchNextPage : undefined}
        loader={loader}
        height={600}
        itemHeight={290}
        items={tripledFlatPosts}
        additionalItemsCount={3}
        paddingForItem={29}
      />
    </If>
  )
}

export default ProfilePosts