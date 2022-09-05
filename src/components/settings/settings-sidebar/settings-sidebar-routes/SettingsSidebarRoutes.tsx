import {NavLink} from 'react-router-dom'
import s from './SettingsSidebarRoutes.module.scss'


const SettingsSidebarRoutes = () => {
  return (
    <div className={s.sidebar_routes_container}>
      <NavLink to='edit-profile' className={s.sidebar_route}>
        Edit profile
      </NavLink>
      <NavLink to='change-password' className={s.sidebar_route}>
        Change password
      </NavLink>
    </div>
  )
}

export default SettingsSidebarRoutes
