import AccountInfo from './account-info/AccountInfo'
import Suggestions from './suggestions/Suggestions'

const RightPanel = () => {
	return (
		<div className='border-gray10 pt-[18px] w-[292px] h-fit flex flex-col border-2 rounded-lg bg-white px-5'>
			<AccountInfo />
			<Suggestions />
		</div>
	)
}

export default RightPanel
