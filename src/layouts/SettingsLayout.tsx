import { Outlet } from 'react-router-dom'
import SettingsSidebar from '@components/settings/settings-sidebar/SettingsSidebar'

const SettingsLayout = () => {
	return (
		<div className='border-gray10 w-[928px] flex border bg-white'>
			<SettingsSidebar />
			<Outlet />
		</div>
	)
}

export default SettingsLayout
