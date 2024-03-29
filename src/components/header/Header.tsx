import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import InstagramTitle from '@components/common/assets/InstagramTitle'
import CompassIcon from '@components/common/assets/icons/CompassIcon'
import HomeFilledIcon from '@components/common/assets/icons/HomeFilledIcon'
import HomeIcon from '@components/common/assets/icons/HomeIcon'
import LikeIcon from '@components/common/assets/icons/LikeIcon'
import MessengerIcon from '@components/common/assets/icons/MessengerIcon'
import PlusIcon from '@components/common/assets/icons/PlusIcon'
import If from '@components/common/if/If'
import CurrentUser from '@components/header/current-user/CurrentUser'
import Search from '../common/search/Search'
import s from './Header.module.scss'
import CreatePost from './create-post/CreatePost'

const Header = () => {
	const [isCreatePostModal, setIsCreatePostModal] = useState(false)

	const path = useLocation().pathname
	const isProfilePage = path.includes('/profile')
	const isSettingsPage = path.includes('settings')

	return (
		<header className={s.header_wrapper} id='header'>
			<div className={s.header_container}>
				<InstagramTitle className='mr-[150px] mt-2' />
				<Search />
				<nav className='w-100 ml-[150px] flex items-center justify-between'>
					<NavLink to='/feed' className={s.header_icon_container}>
						{({ isActive }: { isActive: boolean }) =>
							isActive ? <HomeFilledIcon /> : <HomeIcon />
						}
					</NavLink>
					<NavLink to='/messenger' className={s.header_icon_container}>
						<MessengerIcon />
					</NavLink>
					<div
						className={s.header_icon_container}
						onClick={() => setIsCreatePostModal(true)}
					>
						<PlusIcon filled={isCreatePostModal} />
					</div>
					<NavLink to='/explore' className={s.header_icon_container}>
						<CompassIcon />
					</NavLink>
					<NavLink to='/likes' className={s.header_icon_container}>
						<LikeIcon />
					</NavLink>
					<div
						className={`${s.header_icon_container} ${s.profile} ${
							(isProfilePage || isSettingsPage) && s.active
						}`}
					>
						<CurrentUser />
					</div>
				</nav>
			</div>
			<If condition={isCreatePostModal}>
				<CreatePost onClose={() => setIsCreatePostModal(false)} />
			</If>
		</header>
	)
}

export default Header
