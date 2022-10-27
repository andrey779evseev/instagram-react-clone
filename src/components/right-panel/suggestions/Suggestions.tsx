import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import If from '@components/common/if/If'
import UserMiniatureModel from '@api/common/models/responses/UserMiniatureModel'
import { AccountService } from '@api/services/account/AccountService'
import { FriendshipsService } from '@api/services/friendships/FriendshipsService'
import SuggestionItem from './item/SuggestionItem'
import SuggestionModal from './modal/SuggestionModal'

const Suggestions = () => {
	const [isModal, setIsModal] = useState(true)
	const { data: user } = useQuery(['user'], AccountService.GetUser)
	const { data: suggestions, isLoading } = useQuery(
		['suggestions', user?.Id, 5],
		() => FriendshipsService.GetSuggestions({ Take: 5 })
	)

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
			{(
				suggestions ?? (Array(4).fill(null) as Array<UserMiniatureModel | null>)
			).map((suggestion, i) => (
				<SuggestionItem
					isLoading={isLoading}
					suggestion={suggestion!}
					userId={user!.Id}
					key={i}
				/>
			))}
			<If condition={isModal}>
				<SuggestionModal onClose={() => setIsModal(false)} userId={user!.Id} />
			</If>
		</div>
	)
}

export default Suggestions
