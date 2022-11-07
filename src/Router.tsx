import loadable from '@loadable/component'
import pMinDelay from 'p-min-delay'
import { Navigate, Route, Routes } from 'react-router-dom'
import PagePreloader from '@components/common/page-preloader/PagePreloader'
import Spinner from '@components/common/spinner/Spinner'

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
	() => pMinDelay(import('@pages/profile/posts/ProfilePosts'), 200),
	{
		fallback: <Spinner full />,
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
			{/* authorization wrapper for all pages */}
			<Route element={<AuthorizationGuard />} path='/'>
				{/* layout wrapper for authorized pages */}
				<Route element={<Layout />} path=''>
					{/* default redirect from index to feed */}
					<Route index element={<Navigate to='/feed' />} />

					{/* feed page */}
					<Route element={<Feed />} path='/feed' />

					{/* layout for settings tabs */}
					<Route element={<SettingsLayout />} path='/settings'>
						{/* default redirect from index to edit profile tab */}
						<Route index element={<Navigate to='edit-profile' />} />

						{/* edit profile tab in settings */}
						<Route element={<EditProfile />} path='edit-profile' />

						{/* change password tab in settings */}
						<Route element={<ChangePassword />} path='change-password' />
					</Route>

					{/* profile page */}
					<Route element={<Profile />} path='/profile/:userId'>
						{/* posts tab on profile */}
						<Route element={<ProfilePosts />} path='posts' />
					</Route>
				</Route>

				{/* auth layout for non authorized pages */}
				<Route element={<AuthLayout />} path=''>
					{/* login page */}
					<Route element={<Login />} path='/login' />

					{/* registration page */}
					<Route element={<Registration />} path='/registration' />
				</Route>
			</Route>
		</Routes>
	)
}

export default Router
