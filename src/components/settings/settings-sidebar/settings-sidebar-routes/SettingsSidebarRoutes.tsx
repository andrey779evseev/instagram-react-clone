import {NavLink} from 'react-router-dom'
import './SettingsSidebarRoutes.scss'


const SettingsSidebarRoutes: React.FC = () => {
  return (
    <div className="sidebar_routes_container">
      <NavLink to='edit-profile' className='sidebar_route'>
        Edit profile
      </NavLink>
      <NavLink to='change-password' className='sidebar_route'>
        Change password
      </NavLink>
    </div>
  )
}

export default SettingsSidebarRoutes
