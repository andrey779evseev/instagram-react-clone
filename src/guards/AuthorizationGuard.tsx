import { useQueryClient } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Preloader from '@components/common/page-preloader/PagePreloader'
import { SaveToLocalStorage } from '@utils/LocalStorage'
import User from '@api/common/models/user/User'
import { GetCurrentUserAsync } from '@api/services/user/UserService'
import { CredentialsAtom } from '@store/atoms/AuthenticationAtom'

const AuthorizationGuard = () => {
	const credentials = useAtomValue(CredentialsAtom)
	const navigate = useNavigate()
	const isLoginPage = useLocation().pathname.includes('login')
	const isRegistrationPage = useLocation().pathname.includes('registration')
	const qc = useQueryClient()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (credentials === null) {
			if (!isLoginPage && !isRegistrationPage) navigate('/login')
			setIsLoading(false)
		} else {
			(async () => {
				let user: User | null = null
				try {
					user = await GetCurrentUserAsync()
				} catch {
					setIsLoading(false)
				}
				qc.setQueryData(['user'], () => user)
				if (user) {
					SaveToLocalStorage('email', user.Email)
					if (isLoginPage || isRegistrationPage) navigate('/feed')
				}
				setIsLoading(false)
			})()
		}
	}, [])

	if (isLoading) return <Preloader />

	return <Outlet />
}

export default AuthorizationGuard
