import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
	return (
		<main className='w-full h-full min-h-screen flex items-center justify-center py-8'>
			<Outlet />
		</main>
	)
}

export default AuthLayout
