import { useRef, useState } from 'react'
import SearchIcon from '../assets/icons/SearchIcon'
import './Search.scss'

const Search = () => {
	const [value, setValue] = useState('')
	const [isInputFocused, setIsInputFocused] = useState(false)
	const inputRef = useRef(null)

	const focusOnInput = () => {
		if (!inputRef || !inputRef.current) return
		;(inputRef.current as HTMLInputElement).focus()
		setIsInputFocused(true)
	}

	return (
		<div className='relative w-fit h-fit'>
			<form autoComplete='off'>
				<input
					ref={inputRef}
					className='search_input'
					value={value}
					onChange={(e) => setValue(e.target.value)}
					onBlur={() => setIsInputFocused(false)}
				/>
			</form>
			<span
				className={`search_input_placeholder ${
					!value && !isInputFocused ? 'show' : ''
				}`}
				onClick={focusOnInput}
			>
				<SearchIcon className='mr-3' />
				Search
			</span>
		</div>
	)
}

export default Search
