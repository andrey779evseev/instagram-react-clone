import { Outlet } from 'react-router-dom'
import Header from '@components/header/Header'

const Layout = () => {
	return (
		<div className='flex flex-col items-center'>
			<Header />
			<main className='content mt-[60px]'>
				<Outlet />
			</main>
		</div>
	)
}

export default Layout
