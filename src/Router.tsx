import loadable from '@loadable/component'
import pMinDelay from 'p-min-delay'
import { Navigate, createBrowserRouter } from 'react-router-dom'
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

export const router = createBrowserRouter([
	{
		path: '/',
		element: <AuthorizationGuard />,
		children: [
			{
				path: '',
				element: <Layout />,
				children: [
					{
						index: true,
						element: <Navigate to='/feed' />,
					},
					{
						path: '/feed',
						element: <Feed />,
					},
					{
						path: '/settings',
						element: <SettingsLayout />,
						children: [
							{
								index: true,
								element: <Navigate to='edit-profile' />,
							},
							{
								path: 'edit-profile',
								element: <EditProfile />,
							},
							{
								path: 'change-password',
								element: <ChangePassword />,
							},
						],
					},
					{
						path: '/profile/:userId',
						element: <Profile />,
						children: [
							{
								path: 'posts',
								element: <ProfilePosts />,
							},
						],
					},
				],
			},
			{
				path: '',
				element: <AuthLayout />,
				children: [
					{
						path: '/login',
						element: <Login />,
					},
					{
						path: '/registration',
						element: <Registration />,
					},
				],
			},
		],
	},
])

export const rootNavigate = router.navigate
