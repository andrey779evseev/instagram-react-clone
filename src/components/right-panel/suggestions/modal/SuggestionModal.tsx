import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import Modal from '@components/common/modal/Modal'
import ModalHeader from '@components/common/modal/header/ModalHeader'
import Spinner from '@components/common/spinner/Spinner'
import useWindowSize from '@hooks/UseWindowSize'
import { FriendshipsService } from '@api/services/friendships/FriendshipsService'
import SuggestionItem from '../item/SuggestionItem'

type PropsType = {
	onClose: () => void
}

const SuggestionModal = (props: PropsType) => {
	const { onClose } = props

	const { windowHeight } = useWindowSize()

	const { data: suggestions, isLoading } = useQuery({
		queryKey: ['suggestions', { take: 20 }],
		queryFn: () => FriendshipsService.GetSuggestions({ Take: 20 }),
	})

	return (
		<Modal
			onClose={onClose}
			minWidth={400}
			height={windowHeight - 100}
			width='auto'
			aspectRatio={2 / 1}
			rounded={true}
		>
			<div className='w-full h-full flex flex-col'>
				<ModalHeader title='Suggestions' onClose={onClose} />
				<div className='flex-1 px-4'>
					{isLoading ? (
						<Spinner full />
					) : (
						suggestions?.map((suggestion) => (
							<SuggestionItem
								suggestion={suggestion}
								key={suggestion.Id}
								isSmall={false}
							/>
						))
					)}
				</div>
			</div>
		</Modal>
	)
}

export default memo(SuggestionModal)
