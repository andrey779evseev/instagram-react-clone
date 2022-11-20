import { memo } from 'react'
import Modal from '@components/common/modal/Modal'
import ModalHeader from '@components/common/modal/header/ModalHeader'
import Spinner from '@components/common/spinner/Spinner'
import useWindowSize from '@hooks/UseWindowSize'
import { usePostLikesQuery } from '@api/services/likes/LikesService'
import LikesListItem from './LikesListItem'

type PropsType = {
	postId: string
	onClose: () => void
}

const LikesListModal = (props: PropsType) => {
	const { postId, onClose } = props

	const { windowHeight } = useWindowSize()

	const { data: likes, isLoading } = usePostLikesQuery(postId)

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
				<ModalHeader title='Likes' onClose={onClose} />
				<div className='mt-2 flex-1 px-4'>
					{isLoading ? (
						<Spinner full />
					) : (
						likes?.map((like) => (
							<LikesListItem like={like} key={like.Id} onClose={onClose} />
						))
					)}
				</div>
			</div>
		</Modal>
	)
}

export default memo(LikesListModal)
