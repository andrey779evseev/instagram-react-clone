import SettingsSidebarMeta from '@components/settings/settings-sidebar/settings-sidebar-meta/SettingsSidebarMeta'
import SettingsSidebarRoutes from '@components/settings/settings-sidebar/settings-sidebar-routes/SettingsSidebarRoutes'

const SettingsSidebar = () => {
	return (
		<div className='border-r-gray10 flex w-[220px] min-w-[220px] flex-col justify-between border-r'>
			<SettingsSidebarRoutes />
			<SettingsSidebarMeta />
		</div>
	)
}

export default SettingsSidebar
