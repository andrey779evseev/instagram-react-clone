import { useRef, useState } from "react"
import './Search.scss'
import searchIcon from '../../../assets/header-icons/search-icon.svg'


const Search: React.FC = () => {
  const [value, setValue] = useState('')
  const [isInputFocused, setIsInputFocused] = useState(false)
  const inputRef = useRef(null)

  const focusOnInput = () => {
    if(!inputRef || !inputRef.current) return
    (inputRef.current as HTMLInputElement).focus()
    setIsInputFocused(true)
  }

  return (
    <div className="relative w-fit h-fit">
      <input 
        ref={inputRef}
        className='search_input'
        value={value}
        onChange={e => setValue(e.target.value)}
        onBlur={() => setIsInputFocused(false)}
      />
      <span className={`search_input_placeholder ${!value && !isInputFocused ? 'show' : ''}`} onClick={focusOnInput}>
        <img src={searchIcon} className='mr-0.5'/>
        Search
      </span>
    </div>
  )
}

export default Search