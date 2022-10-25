import Avatar, { EnumAvatarSize } from '@components/common/avatar/Avatar'
import suggestions from './suggestions.json'

const Suggestions = () => {
	return (
		<div className='flex flex-col mt-6 mb-2'>
			<div className='flex items-center justify-between mb-2'>
				<span className='text-gray50 font-semibold'>Suggestions For You</span>
				<span className='text-dark font-semibold cursor-pointer'>See All</span>
			</div>
			{suggestions.map((suggestion, i) => (
				<div className='card flex my-2 items-center' key={i}>
					<Avatar src={suggestion.Avatar} size={EnumAvatarSize.Medium} />
					<div className='items-between flex flex-col w-full px-3 overflow-hidden'>
						<span className='text-dark'>terylucas</span>
						<div className='text-gray50 overflow-hidden text-ellipsis whitespace-nowrap'>
							Followed {suggestion.CommonFollower} +{' '}
							{suggestion.CommonFollowersCount - 1} more
						</div>
					</div>
					<span className='text-cobalt cursor-pointer'>Follow</span>
				</div>
			))}
		</div>
	)
}

export default Suggestions
