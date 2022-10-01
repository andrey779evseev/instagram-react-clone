import CompassIcon from '@components/common/assets/icons/CompassIcon'
import LikeIcon from '@components/common/assets/icons/LikeIcon'
import HomeFilledIcon from '@components/common/assets/icons/HomeFilledIcon'
import HomeIcon from '@components/common/assets/icons/HomeIcon'
import MessengerIcon from '@components/common/assets/icons/MessengerIcon'
import OutlinedPlusIcon from '@components/common/assets/icons/OutlinedPlusIcon'
import InstagramTitle from '@components/common/assets/InstagramTitle'
import CurrentUser from '@components/header/current-user/CurrentUser'
import { NavLink, useLocation } from 'react-router-dom'
import Search from '../common/search/Search'
import s from './Header.module.scss'


const Header = () => {
  const path = useLocation().pathname
  const isProfilePage = path.includes('/profile')
  const isSettingsPage = path.includes('settings')
  return (
    <div className={s.header_wrapper}>
      <div className={s.header_container}>
        <InstagramTitle className='mt-2 mr-[150px]'/>
        <Search/>
        <div className='flex ml-[150px] items-center w-100 justify-between'>
          <NavLink to='/feed' className={s.header_icon_container}>
            {({isActive}: any) => (
              isActive ? <HomeFilledIcon/> : <HomeIcon/>
            )}
          </NavLink>
          <NavLink to='/messenger'  className={s.header_icon_container}>
            <MessengerIcon/>
          </NavLink>
          <NavLink to='/create-post'  className={s.header_icon_container}>
            <OutlinedPlusIcon/>
          </NavLink>
          <NavLink to='/explore'  className={s.header_icon_container}>
            <CompassIcon/>
          </NavLink>
          <NavLink to='/likes'  className={s.header_icon_container}>
            <LikeIcon/>
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
