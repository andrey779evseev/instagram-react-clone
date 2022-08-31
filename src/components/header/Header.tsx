import './Header.scss'
import instagramLogo from '@assets/icons/common/instagram-logo.svg'
import Search from './search/Search'
import CurrentUser from '@components/header/current-user/CurrentUser'
import {NavLink, useLocation} from 'react-router-dom'


const Header: React.FC = () => {
  const path = useLocation().pathname
  const isProfilePage = path.includes('/profile')
  const isSettingsPage = path.includes('settings')
  return (
    <div className='header_wrapper'>
      <div className='header_container'>
        <img src={instagramLogo} className='mt-2 mr-[150px]'/>
        <Search/>
        <div className='flex ml-[150px] items-center w-100 justify-between'>
          <NavLink to='/feed' className='header_icon_container'>
            <div className='header_icon home'/>
          </NavLink>
          <NavLink to='/messenger'  className='header_icon_container'>
            <div className="header_icon messenger"/>
          </NavLink>
          <NavLink to='/create-post'  className='header_icon_container'>
            <div className="header_icon plus"/>
          </NavLink>
          <NavLink to='/explore'  className='header_icon_container'>
            <div className="header_icon compass"/>
          </NavLink>
          <NavLink to='/likes'  className='header_icon_container'>
            <div className="header_icon heart"/>
          </NavLink>
          <div className={`header_icon_container profile ${(isProfilePage || isSettingsPage) && 'active'}`}>
            <CurrentUser/>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Header
