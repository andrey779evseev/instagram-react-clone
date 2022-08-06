import './Header.scss'
import instagramLogo from '../../assets/instagram-logo.svg'
import homeIcon from '../../assets/header-icons/home-icon.svg'
import messangerIcon from '../../assets/header-icons/messanger-icon.svg'
import plusIcon from '../../assets/header-icons/plus-icon.svg'
import compasIcon from '../../assets/header-icons/compas-icon.svg'
import heartIcon from '../../assets/header-icons/heart-icon.svg'
import avatar from '../../assets/avatar.png'
import Search from './Search/Search'


const Header: React.FC = () => {
  return (
    <div className='header_wrapper'>
      <div className='header_container'>
        <img src={instagramLogo} className='mt-2 mr-[257px]'/>
        <Search/>
        <div className="flex ml-[118px] items-center w-100 justify-between">
          <img src={homeIcon} className='header_icon'/>
          <img src={messangerIcon} className='header_icon'/>
          <img src={plusIcon} className='header_icon'/>
          <img src={compasIcon} className='header_icon'/>
          <img src={heartIcon} className='header_icon'/>
          <img src={avatar} className='header_icon'/>
        </div>
      </div>
    </div>
  )
}


export default Header