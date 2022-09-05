import AccountInfo from './account-info/AccountInfo'
import Suggestions from './suggestions/Suggestions'


const RightPanel = () => {
  return (
    <div className='pt-[18px] w-[292px] flex flex-col'>
      <AccountInfo/>
      <Suggestions/>
    </div>
  )
}


export default RightPanel