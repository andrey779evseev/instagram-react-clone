import SettingsSidebarMeta from '@components/settings/settings-sidebar/settings-sidebar-meta/SettingsSidebarMeta'
import SettingsSidebarRoutes from '@components/settings/settings-sidebar/settings-sidebar-routes/SettingsSidebarRoutes'

const SettingsSidebar = () => {
	return (
		<div className='border-r-gray10 w-[220px] min-w-[220px] border-r flex flex-col justify-between'>
			<SettingsSidebarRoutes />
			<SettingsSidebarMeta />
		</div>
	)
}

export default SettingsSidebar
