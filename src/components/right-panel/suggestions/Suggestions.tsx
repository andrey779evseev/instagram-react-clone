import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import If from '@components/common/if/If'
import { FriendshipsService } from '@api/services/friendships/FriendshipsService'
import SuggestionItem from './item/SuggestionItem'
import SuggestionModal from './modal/SuggestionModal'

const Suggestions = () => {
	const [isModal, setIsModal] = useState(false)
	const { data: suggestions } = useQuery({
		queryKey: ['suggestions', { take: 5 }],
		queryFn: () => FriendshipsService.GetSuggestions({ Take: 5 }),
	})

	return (
		<div className='flex flex-col mt-6 mb-2'>
			<div className='flex items-center justify-between mb-2'>
				<span className='text-gray50 font-semibold'>Suggestions For You</span>
				<span
					className='text-dark font-semibold cursor-pointer'
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
