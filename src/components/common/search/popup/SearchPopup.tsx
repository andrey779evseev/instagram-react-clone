import { useInfiniteQuery } from '@tanstack/react-query'
import { memo, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { FriendshipsService } from '@api/services/friendships/FriendshipsService'
import Button from '../../button/Button'
import If from '../../if/If'
import LittleLoading from '../../little-loading/LittleLoading'
import s from '../Search.module.scss'
import SearchPopupItem from './SearchPopupItem'

type PropsType = {
	visible: boolean
	value: string
	deferredValue: string
	delayedClearValue: () => void
}

const SearchPopup = (props: PropsType) => {
	const { visible, value, deferredValue, delayedClearValue } = props
	const navigate = useNavigate()

	const {
		data: users,
		isLoading,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery(
		['users', { searchTerm: deferredValue }],
		({ pageParam = null }) =>
			FriendshipsService.SearchUsers({
				Cursor: pageParam,
				Take: 2,
				Search: deferredValue,
			}),
		{
			getNextPageParam: (lastPage) =>
				lastPage.HasNextPage
					? lastPage.Items[lastPage.Items.length - 1].Id
					: undefined,
			enabled: deferredValue !== '',
		}
	)

	const flatUsers = useMemo(
		() => users?.pages.map((x) => x.Items).flat() ?? [],
		[users]
	)

	const isShowNobodyFound = useMemo(
		() =>
			flatUsers.length === 0 &&
			value !== '' &&
			!isLoading &&
			!isFetchingNextPage &&
			deferredValue === value,
		[flatUsers, value, isLoading, isFetchingNextPage, deferredValue]
	)

	const isShowLoading = useMemo(
		() => value !== '' && (isLoading || deferredValue !== value),
		[value, isLoading, deferredValue]
	)

	const isShowButton = useMemo(
		() => !!hasNextPage && !isLoading && value === deferredValue,
		[hasNextPage, isLoading, deferredValue, value]
	)

	const goToProfile = (userId: string) => {
		navigate(`/profile/${userId}/posts`)
		delayedClearValue()
	}

	return (
		<div className={`${s.search_popup_container} ${visible && s.visible}`}>
			<div className={s.triangle} />
			<div className='flex flex-col'>
				<If condition={flatUsers.length !== 0}>
					{flatUsers.map((user) => (
						<SearchPopupItem
							user={user}
							key={user.Id}
							goToProfile={goToProfile}
							isShowButton={isShowButton}
						/>
					))}
				</If>
				<If condition={isShowNobodyFound}>
					<div className='flex-center w-full my-4 text-lg font-light'>
						Nobody found
					</div>
				</If>
				<If condition={isShowLoading}>
					<div className='flex-center my-4 w-full'>
						<LittleLoading color='cobalt' />
					</div>
				</If>
				<If condition={isShowButton}>
					<Button
						isLoading={isFetchingNextPage}
						onClick={() => fetchNextPage()}
					>
						More
					</Button>
				</If>
			</div>
		</div>
	)
}

export default memo(SearchPopup)
