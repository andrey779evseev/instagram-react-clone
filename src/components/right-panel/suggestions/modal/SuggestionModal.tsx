import { memo } from 'react'
import PeoplesIcon from '@components/common/assets/icons/PeoplesIcon'
import If from '@components/common/if/If'
import Modal from '@components/common/modal/Modal'
import ModalHeader from '@components/common/modal/header/ModalHeader'
import Spinner from '@components/common/spinner/Spinner'
import useWindowSize from '@hooks/UseWindowSize'
import { useUsersSuggestionsQuery } from '@api/services/friendships/FriendshipsService'
import SuggestionItem from '../item/SuggestionItem'

type PropsType = {
	onClose: () => void
}

const SuggestionModal = (props: PropsType) => {
	const { onClose } = props

	const { windowHeight } = useWindowSize()

	const { data: suggestions, isLoading } = useUsersSuggestionsQuery(20)

	return (
		<Modal
			onClose={onClose}
			minWidth={400}
			height={windowHeight - 100}
			width='auto'
			aspectRatio={2 / 1}
			rounded={true}
		>
			<div className='flex h-full w-full flex-col'>
				<ModalHeader title='Suggestions' onClose={onClose} />
				<div className='flex-1 px-4'>
					<If condition={suggestions?.length === 0}>
						<div className='flex-center h-full w-full flex-col'>
							<PeoplesIcon />
							<div className='text-xxl pt-4 pb-1 font-light'>Suggestions</div>
							<div className='text-sm'>
								We don't have any suggestions for you.
							</div>
						</div>
					</If>
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
