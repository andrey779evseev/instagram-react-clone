import {AccountService} from '@api/services/account/AccountService'
import {AuthService} from '@api/services/auth/AuthService'
import instagramLogo from '@assets/icons/common/instagram-logo.svg'
import Button from '@components/common/button/Button'
import DividerWithText from '@components/common/divider-with-text/DividerWithText'
import Error from '@components/common/error/Error'
import GoogleSignInBtn from '@components/common/google-sign-in-btn/GoogleSignInBtn'
import Input from '@components/common/input/Input'
import {CredentialsAtom} from '@store/atoms/AuthenticationAtom'
import {useMutation, useQuery} from '@tanstack/react-query'
import {SaveToLocalStorage} from '@utils/LocalStorage'
import {AxiosError} from 'axios'
import {useUpdateAtom} from 'jotai/utils'
import {useMemo, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './LognCard.scss'

const LoginCard: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const setCredentials = useUpdateAtom(CredentialsAtom)
  const navigate = useNavigate()
  const isAllowedSubmit = useMemo(() => email !== '' && password !== '', [email, password])
  const {refetch} = useQuery(['user'], AccountService.GetUser, {
    enabled: false,
    retry: false,
    onSuccess: res => {
      SaveToLocalStorage('email', res.Email)
      setIsLoading(false)
    }
  })
  const loginMutation = useMutation(AuthService.Login, {
    onSuccess: async res => {
      setCredentials(res)
      await refetch()
      navigate('/feed')
    },
    onError: (error: AxiosError) => {
      setErrMsg(error.response?.data as string)
    }
  })

  const login = () => {
    setIsLoading(true)
    loginMutation.mutate({
      Email: email,
      Password: password
    })
  }

  return (
    <div className='login_card'>
      <div className="login_card_content">
        <img src={instagramLogo} className='w-[183px] h-[57px] mb-6'/>
        <div className="mb-3.5 w-full">
          <Input
            value={email}
            setValue={setEmail}
            placeholder='Username, or mail'
          />
        </div>
        <div className="mb-2.5 w-full">
          <Input
            value={password}
            setValue={setPassword}
            placeholder='Password'
            type='password'
          />
        </div>
        <Button
          disabled={!isAllowedSubmit}
          onClick={login}
          isLoading={isLoading}
        >
          Log in
        </Button>
        <Error error={errMsg}/>
        <DividerWithText text='OR'/>
        <GoogleSignInBtn setIsLoading={setIsLoading}/>
        <div className="forgot_password">
          You forgot the password?
        </div>
      </div>
    </div>
  )
}

export default LoginCard
