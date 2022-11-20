import AccountInfo from './account-info/AccountInfo'
import Suggestions from './suggestions/Suggestions'

const RightPanel = () => {
	return (
		<aside className='border-gray10 flex h-fit w-[292px] flex-col rounded-lg border-2 bg-white px-5 pt-[18px]'>
			<AccountInfo />
			<Suggestions />
		</aside>
	)
}

export default RightPanel
