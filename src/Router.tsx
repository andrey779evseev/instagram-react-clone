import {Navigate, RouteObject} from 'react-router-dom'
import Login from '@pages/login/Login'
import Feed from '@pages/feed/Feed'
import Layout from '@layouts/Layout'
import AuthLayout from '@layouts/AuthLayout'
import Registration from '@pages/registration/Registration'
import EditProfile from '@pages/settings/edit-profile/EditProfile'
import ChangePassword from '@pages/settings/change-password/ChangePassword'
import SettingsLayout from '@layouts/SettingsLayout'
import Profile from '@pages/profile/Profile'
import ProfilePosts from '@pages/profile/posts/ProfilePosts'


const router: RouteObject[] = [
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Navigate to='/feed' />
      },
      {
        path: '/feed',
        element: <Feed/>
      },
      {
        path: '/settings',
        element: <SettingsLayout/>,
        children: [
          {
            index: true,
            element: <Navigate to='edit-profile'/>
          },
          {
            path: 'edit-profile',
            element: <EditProfile/>
          },
          {
            path: 'change-password',
            element: <ChangePassword/>
          }
        ]
      },
      {
        path: '/profile',
        element: <Profile/>,
        children: [
          {
            path: 'posts',
            element: <ProfilePosts/>
          }
        ]
      }
    ]
  },
  {
    path: '/',
    element: <AuthLayout/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/registration',
        element: <Registration/>
      }
    ]
  }
]

export default router
