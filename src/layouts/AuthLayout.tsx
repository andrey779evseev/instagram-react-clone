import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
	return (
		<main className='flex h-full min-h-screen w-full items-center justify-center py-8'>
			<Outlet />
		</main>
	)
}

export default AuthLayout
