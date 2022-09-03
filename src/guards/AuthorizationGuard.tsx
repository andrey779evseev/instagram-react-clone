import {AccountService} from '@api/services/account/AccountService'
import Preloader from '@components/common/preloader/Preloader'
import User from '@models/user/User'
import {CredentialsAtom} from '@store/atoms/AuthenticationAtom'
import {useQueryClient} from '@tanstack/react-query'
import {SaveToLocalStorage} from '@utils/LocalStorage'
import {useAtomValue} from 'jotai'
import {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'


type PropsType = {
  children?: JSX.Element
}

const AuthorizationGuard = (props: PropsType) => {
  const {children} = props
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
        await qc.prefetchQuery(['user'], AccountService.GetUser)
        const user = qc.getQueryData<User>(['user'])
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
    return <Preloader full/>
  
  return <>{children}</>
}

export default AuthorizationGuard
