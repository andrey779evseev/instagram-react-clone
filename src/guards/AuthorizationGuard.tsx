import { AccountService } from '@api/services/account/AccountService'
import Preloader from '@components/common/page-preloader/PagePreloader'
import User from '@models/user/User'
import { CredentialsAtom } from '@store/atoms/AuthenticationAtom'
import { useQueryClient } from '@tanstack/react-query'
import { SaveToLocalStorage } from '@utils/LocalStorage'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'


const AuthorizationGuard = () => {
  const credentials = useAtomValue(CredentialsAtom)
  let navigate = useNavigate();
  const isLoginPage = useLocation().pathname.includes('login')
  const isRegistrationPage = useLocation().pathname.includes('registration')
  const qc = useQueryClient()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if(credentials === null) {
      if(!isLoginPage && !isRegistrationPage)
        navigate('/login')
      setIsLoading(false)
    } else {
      (async () => {
        const user = await AccountService.GetUser()
        qc.setQueryData(['user'], () => user)
        if(user) {
          SaveToLocalStorage('email', user.Email)
          if(isLoginPage || isRegistrationPage)
            navigate('/feed')
        }
        setIsLoading(false)
      })()
    }
  }, [])

  if(isLoading)
    return <Preloader/>
  
  return <Outlet/>
}

export default AuthorizationGuard
