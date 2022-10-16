import { Outlet } from 'react-router-dom'
import SettingsSidebar from '@components/settings/settings-sidebar/SettingsSidebar'

const SettingsLayout = () => {
	return (
		<div className='w-[928px] flex border border-gray10 bg-white'>
			<SettingsSidebar />
			<Outlet />
		</div>
	)
}

export default SettingsLayout
