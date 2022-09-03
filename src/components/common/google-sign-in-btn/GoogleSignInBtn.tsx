import {AccountService} from '@api/services/account/AccountService'
import {AuthService} from '@api/services/auth/AuthService'
import googleLogo from '@assets/icons/common/google-logo.svg'
import {CredentialsAtom} from '@store/atoms/AuthenticationAtom'
import {useMutation, useQuery} from '@tanstack/react-query'
import {SaveToLocalStorage} from '@utils/LocalStorage'
import {useUpdateAtom} from 'jotai/utils'
import {memo, useEffect, useState} from 'react'
import {useGoogleLogin} from 'react-google-login'
import {useNavigate} from 'react-router-dom'
import './GoogleSignInBtn.scss'

type PropsType = {
  setIsLoading: Function
}

const GoogleSignInBtn = memo((props: PropsType) => {
  const {setIsLoading} = props
  const setCredentials = useUpdateAtom(CredentialsAtom)
  const navigate = useNavigate()
  const [isButtonClicked, setIsButtonClicked] = useState(false)
  const [googleUser, setGoogleUser] = useState<any>(null)

  const googleLoginMutation = useMutation(AuthService.GoogleLogin, {
    onSuccess: async res => {
      setCredentials(res)
      await refetch()
      navigate('/feed')
    }
  })

  const {refetch} = useQuery(['user'], AccountService.GetUser, {
    enabled: false,
    retry: false,
    onSuccess: res => {
      SaveToLocalStorage('email', res.Email)
      setIsLoading(false)
    }
  })

  useEffect(() => {
    if(!googleUser || !isButtonClicked) return
    setIsLoading(true)
    googleLoginMutation.mutate({
      Token: googleUser.getAuthResponse().id_token,
      Email: googleUser.profileObj.email,
      Name: googleUser.profileObj.name,
      Avatar: googleUser.profileObj.imageUrl
    })
  }, [googleUser, isButtonClicked])
  
  const login = () => {
    setIsButtonClicked(true)
    if(!googleUser)
      signIn()
  }
  
  const onSuccess = (res: any) => {
    setGoogleUser(res)
  }

  const onFailure = (err: any) => {
    console.log('google login failed:', err)
  }

  const { signIn } = useGoogleLogin({
    onSuccess,
    clientId: import.meta.env.VITE_GOOGLE_SIGNIN_CLIENT_ID,
    cookiePolicy: 'single_host_origin',
    isSignedIn: true,
    onFailure,
  })

  return (
    <div className='google_sign_in_btn' onClick={login}>
      <img src={googleLogo} className='logo'/>
      Continue with google
    </div>
  )
})

export default GoogleSignInBtn
