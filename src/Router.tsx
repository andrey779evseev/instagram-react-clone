import loadable from '@loadable/component'
import pMinDelay from 'p-min-delay'
import { Navigate, Route, Routes } from 'react-router-dom'
import PagePreloader from '@components/common/page-preloader/PagePreloader'

const AuthorizationGuard = loadable(
	() => pMinDelay(import('@guards/AuthorizationGuard'), 200),
	{
		fallback: <PagePreloader />,
	}
)
const Layout = loadable(() => pMinDelay(import('@layouts/Layout'), 200), {
	fallback: <PagePreloader />,
})
const Feed = loadable(() => pMinDelay(import('@pages/feed/Feed'), 200), {
	fallback: <PagePreloader />,
})
const SettingsLayout = loadable(
	() => pMinDelay(import('@layouts/SettingsLayout'), 200),
	{
		fallback: <PagePreloader />,
	}
)
const Login = loadable(() => pMinDelay(import('@pages/login/Login'), 200), {
	fallback: <PagePreloader />,
})
const AuthLayout = loadable(
	() => pMinDelay(import('@layouts/AuthLayout'), 200),
	{
		fallback: <PagePreloader />,
	}
)
const ProfilePosts = loadable(
	() => pMinDelay(import('@pages/profile/posts/ProfilePosts'), 1000),
	{
		fallback: <PagePreloader />,
	}
)
const Profile = loadable(
	() => pMinDelay(import('@pages/profile/Profile'), 200),
	{
		fallback: <PagePreloader />,
	}
)
const Registration = loadable(
	() => pMinDelay(import('@pages/registration/Registration'), 200),
	{
		fallback: <PagePreloader />,
	}
)
const ChangePassword = loadable(
	() =>
		pMinDelay(import('@pages/settings/change-password/ChangePassword'), 200),
	{
		fallback: <PagePreloader />,
	}
)
const EditProfile = loadable(
	() => pMinDelay(import('@pages/settings/edit-profile/EditProfile'), 200),
	{
		fallback: <PagePreloader />,
	}
)

const Router = () => {
	return (
		<Routes>
			<Route element={<AuthorizationGuard />} path='/'>
				<Route element={<Layout />} path=''>
					<Route index element={<Navigate to='/feed' />} />
					<Route element={<Feed />} path='/feed' />
					<Route element={<SettingsLayout />} path='/settings'>
						<Route index element={<Navigate to='edit-profile' />} />
						<Route element={<EditProfile />} path='edit-profile' />
						<Route element={<ChangePassword />} path='change-password' />
					</Route>
					<Route element={<Profile />} path='/profile'>
						<Route element={<ProfilePosts />} path='posts' />
					</Route>
				</Route>
				<Route element={<AuthLayout />} path=''>
					<Route element={<Login />} path='/login' />
					<Route element={<Registration />} path='/registration' />
				</Route>
			</Route>
		</Routes>
	)
}

export default Router
