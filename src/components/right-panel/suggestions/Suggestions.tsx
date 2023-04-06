import { useState } from 'react'
import If from '@components/common/if/If'
import { useUsersSuggestionsQuery } from '@api/services/friendships/FriendshipsService'
import SuggestionItem from './item/SuggestionItem'
import SuggestionModal from './modal/SuggestionModal'

const Suggestions = () => {
	const [isModal, setIsModal] = useState(false)
	const { data: suggestions } = useUsersSuggestionsQuery(5)

	return (
		<div className='mb-2 mt-6 flex flex-col'>
			<div className='mb-2 flex items-center justify-between'>
				<span className='text-gray50 font-semibold'>Suggestions For You</span>
				<span
					className='text-dark cursor-pointer font-semibold'
					onClick={() => setIsModal(true)}
				>
					See All
				</span>
			</div>
			{suggestions?.map((suggestion, i) => (
				<SuggestionItem suggestion={suggestion!} key={i} />
			))}
			<If condition={isModal}>
				<SuggestionModal onClose={() => setIsModal(false)} />
			</If>
		</div>
	)
}

export default Suggestions
