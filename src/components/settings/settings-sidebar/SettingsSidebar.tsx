import './SettingsSidebar.scss'
import SettingsSidebarRoutes from '@components/settings/settings-sidebar/settings-sidebar-routes/SettingsSidebarRoutes'
import SettingsSidebarMeta from '@components/settings/settings-sidebar/settings-sidebar-meta/SettingsSidebarMeta'

const SettingsSidebar = () => {
  return (
    <div className='settings_sidebar_container'>
      <SettingsSidebarRoutes/>
      <SettingsSidebarMeta/>
    </div>
  )
}

export default SettingsSidebar
