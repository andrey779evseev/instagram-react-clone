import { useEffect, useRef, useState } from 'react'
import useClickOutside from '@hooks/UseClickOutside'
import SearchIcon from '../assets/icons/SearchIcon'
import s from './Search.module.scss'
import SearchPopup from './SearchPopup'

const Search = () => {
	const [value, setValue] = useState('')
	const [visible, setVisible] = useState(false)
	const [isInputFocused, setIsInputFocused] = useState(false)
	const inputRef = useRef(null)
	const visibleTimeoutId = useRef<NodeJS.Timeout | null>(null)
	const valueTimeoutId = useRef<NodeJS.Timeout | null>(null)
	const clickOutsideRef = useClickOutside(() => delayedClearValue())
	const [deferredValue, setDeferredValue] = useState('')

	useEffect(() => {
		clearTimeout(valueTimeoutId.current!)
		valueTimeoutId.current = setTimeout(() => setDeferredValue(value), 300)
	}, [value])

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
			<SearchPopup
				deferredValue={deferredValue}
				value={value}
				visible={visible}
				delayedClearValue={delayedClearValue}
			/>
		</div>
	)
}

export default Search
