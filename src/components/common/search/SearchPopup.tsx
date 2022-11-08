import { useInfiniteQuery } from '@tanstack/react-query'
import { memo, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { FriendshipsService } from '@api/services/friendships/FriendshipsService'
import Avatar, { EnumAvatarSize } from '../avatar/Avatar'
import Button from '../button/Button'
import If from '../if/If'
import LittleLoading from '../little-loading/LittleLoading'
import s from './Search.module.scss'

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
						<div
							key={user.Id}
							className={`flex items-center cursor-pointer mb-2 ${
								!isShowButton && 'last:mb-0'
							}`}
							onClick={() => goToProfile(user.Id)}
						>
							<Avatar src={user.Avatar} size={EnumAvatarSize.Big} />
							<div className='flex flex-col justify-between flex-1 ml-2'>
								<div className='font-semibold'>{user.Nickname}</div>
								<div className='text-gray50'>{user.Name}</div>
							</div>
						</div>
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
