import SettingsSidebarRoutes from '@components/settings/settings-sidebar/settings-sidebar-routes/SettingsSidebarRoutes'
import SettingsSidebarMeta from '@components/settings/settings-sidebar/settings-sidebar-meta/SettingsSidebarMeta'

const SettingsSidebar = () => {
  return (
    <div className='w-[220px] min-w-[220px] border-r border-r-gray10 flex flex-col justify-between'>
      <SettingsSidebarRoutes/>
      <SettingsSidebarMeta/>
    </div>
  )
}

export default SettingsSidebar
