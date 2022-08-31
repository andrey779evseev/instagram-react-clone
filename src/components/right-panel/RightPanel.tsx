import AccountInfo from './account-info/AccountInfo'
import './RightPanel.scss'
import Suggestions from './suggestions/Suggestions'


const RightPanel: React.FC = () => {
  return (
    <div className='right_panel'>
      <AccountInfo/>
      <Suggestions/>
    </div>
  )
}


export default RightPanel