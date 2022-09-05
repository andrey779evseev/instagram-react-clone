import s from './Header.module.scss'
import instagramLogo from '@assets/icons/common/instagram-logo.svg'
import Search from '../common/search/Search'
import CurrentUser from '@components/header/current-user/CurrentUser'
import {NavLink, useLocation} from 'react-router-dom'


const Header = () => {
  const path = useLocation().pathname
  const isProfilePage = path.includes('/profile')
  const isSettingsPage = path.includes('settings')
  return (
    <div className={s.header_wrapper}>
      <div className={s.header_container}>
        <img src={instagramLogo} className='mt-2 mr-[150px]'/>
        <Search/>
        <div className='flex ml-[150px] items-center w-100 justify-between'>
          <NavLink to='/feed' className={s.header_icon_container}>
            {({isActive}: any) => (
              <div className={`${s.header_icon} ${s.home} ${isActive && s.active}`}/>
            )}
          </NavLink>
          <NavLink to='/messenger'  className={s.header_icon_container}>
            {({isActive}: any) => (
              <div className={`${s.header_icon} ${s.messenger} ${isActive && s.active}`}/>
            )}
          </NavLink>
          <NavLink to='/create-post'  className={s.header_icon_container}>
            {({isActive}: any) => (
              <div className={`${s.header_icon} ${s.plus} ${isActive && s.active}`}/>
            )}
          </NavLink>
          <NavLink to='/explore'  className={s.header_icon_container}>
            {({isActive}: any) => (
              <div className={`${s.header_icon} ${s.compass} ${isActive && s.active}`}/>
            )}
          </NavLink>
          <NavLink to='/likes'  className={s.header_icon_container}>
            {({isActive}: any) => (
              <div className={`${s.header_icon} ${s.heart} ${isActive && s.active}`}/>
            )}
          </NavLink>
          <div className={`${s.header_icon_container} ${s.profile} ${(isProfilePage || isSettingsPage) && s.active}`}>
            <CurrentUser/>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Header
