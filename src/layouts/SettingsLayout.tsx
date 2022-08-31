import {Outlet} from 'react-router-dom'
import SettingsSidebar from '@components/settings/settings-sidebar/SettingsSidebar'


const SettingsLayout: React.FC = () => {
  return (
    <div className='w-[919px] flex border border-gray10 bg-white'>
      <SettingsSidebar/>
      <Outlet/>
    </div>
  )
}

export default SettingsLayout
