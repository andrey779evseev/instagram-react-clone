import { Outlet } from 'react-router-dom'
import Header from '@components/header/Header'

const Layout = () => {
	return (
		<main className='flex flex-col items-center'>
			<Header />
			<div className='content mt-[60px]'>
				<Outlet />
			</div>
		</main>
	)
}

export default Layout
