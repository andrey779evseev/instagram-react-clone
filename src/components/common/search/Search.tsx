import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import useClickOutside from '@hooks/UseClickOutside'
import { FriendshipsService } from '@api/services/friendships/FriendshipsService'
import SearchIcon from '../assets/icons/SearchIcon'
import Avatar, { EnumAvatarSize } from '../avatar/Avatar'
import Button from '../button/Button'
import If from '../if/If'
import LittleLoading from '../little-loading/LittleLoading'
import s from './Search.module.scss'

const Search = () => {
	const [value, setValue] = useState('')
	const [visible, setVisible] = useState(false)
	const [isInputFocused, setIsInputFocused] = useState(false)
	const inputRef = useRef(null)
	const visibleTimeoutId = useRef<NodeJS.Timeout | null>(null)
	const valueTimeoutId = useRef<NodeJS.Timeout | null>(null)
	const [deferredValue, setDeferredValue] = useState('')
	const clickOutsideRef = useClickOutside(() => delayedClearValue())
	const navigate = useNavigate()

	useEffect(() => {
		clearTimeout(valueTimeoutId.current!)
		valueTimeoutId.current = setTimeout(() => setDeferredValue(value), 300)
	}, [value])

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

	const delayedClearValue = () => {
		setVisible(false)
		visibleTimeoutId.current = setTimeout(() => {
			setValue('')
		}, 200)
	}

	const focusOnInput = () => {
		if (!inputRef || !inputRef.current) return
		;(inputRef.current as HTMLInputElement).focus()
		setIsInputFocused(true)
	}

	const onInput = (newValue: string) => {
		if (newValue === '') delayedClearValue()
		else {
			clearTimeout(visibleTimeoutId.current!)
			setValue(newValue)
			setVisible(true)
		}
	}

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

	return (
		<div className='relative w-fit h-fit' ref={clickOutsideRef}>
			<form autoComplete='off'>
				<input
					ref={inputRef}
					className={s.search_input}
					value={value}
					onChange={(e) => onInput(e.target.value)}
					onBlur={() => setIsInputFocused(false)}
				/>
			</form>
			<span
				className={`${s.search_input_placeholder} ${
					!value && !isInputFocused ? 'show' : ''
				}`}
				onClick={focusOnInput}
			>
				<SearchIcon className='mr-3' />
				Search
			</span>
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
								onClick={() => navigate(`/profile/${user.Id}`)}
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
		</div>
	)
}

export default Search
