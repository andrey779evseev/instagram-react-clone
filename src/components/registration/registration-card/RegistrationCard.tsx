import s from './RegistrationCard.module.scss'
import GoogleSignInBtn from '@components/common/google-sign-in-btn/GoogleSignInBtn'
import DividerWithText from '@components/common/divider-with-text/DividerWithText'
import Input from '@components/common/input/Input'
import {useMemo, useState} from 'react'
import Button from '@components/common/button/Button'
import Error from '@components/common/error/Error'
import {CredentialsAtom} from '@store/atoms/AuthenticationAtom'
import {useNavigate} from 'react-router-dom'
import {useUpdateAtom} from 'jotai/utils'
import {AuthService} from '@api/services/auth/AuthService'
import {AxiosError} from 'axios'
import {useMutation, useQuery} from '@tanstack/react-query'
import {AccountService} from '@api/services/account/AccountService'
import {SaveToLocalStorage} from '@utils/LocalStorage'
import useDebounce from '@hooks/UseDebounce'
import InstagramTitle from '@components/common/assets/InstagramTitle'


const RegistrationCard = () => {
  const setCredentials = useUpdateAtom(CredentialsAtom)
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const debouncedNickname = useDebounce(nickname, 500)

  const {refetch} = useQuery(['user'], AccountService.GetUser, {
    enabled: false,
    retry: false,
    onSuccess: res => {
      SaveToLocalStorage('email', res.Email)
      setIsLoading(false)
    }
  })
  const registerMutation = useMutation(AuthService.Register, {
    onSuccess: async res => {
      setCredentials(res)
      await refetch()
      navigate('/feed')
    },
    onError: (error: AxiosError) => {
      setErrMsg(error.response?.data as string)
    }
  })
  const { data: validNickname } = useQuery(['check-nickname', debouncedNickname], 
  () => AccountService.CheckNickname(debouncedNickname), {
    enabled: debouncedNickname !== ''
  })

  const disabledBtn = useMemo(() => {
    return email === '' ||
      fullName === '' ||
      nickname === '' ||
      password === '' ||
      validNickname === false
  }, [email, fullName, nickname, password])

  const register = async () => {
    setIsLoading(true)
    registerMutation.mutate({
      Email: email,
      Password: password,
      Nickname: nickname,
      Name: fullName
    })
  }
  
  return (
    <div className={s.registration_card}>
      <InstagramTitle width={183} height={57} className='mb-3'/>
      <div className={s.registration_description}>
        Sign up to see photos and videos of your friends.
      </div>
      <GoogleSignInBtn setIsLoading={setIsLoading}/>
      <DividerWithText text="OR"/>
      <div className={s.form_container}>
        <div className={s.input_container}>
          <Input
            value={email}
            setValue={setEmail}
            placeholder="Email"
          />
        </div>
        <div className={s.input_container}>
          <Input
            value={fullName}
            setValue={setFullName}
            placeholder="Full name"
          />
        </div>
        <div className={s.input_container}>
          <Input
            value={nickname}
            setValue={setNickname}
            placeholder="Nickname"
            error={validNickname === false ? 'This nickname is already taken' : ''}
          />
        </div>
        <div className={s.input_container}>
          <Input
            value={password}
            setValue={setPassword}
            placeholder="Password"
            type="password"
          />
        </div>
      </div>
      <Button
        disabled={disabledBtn}
        isLoading={isLoading}
        onClick={register}
      >
        Sign Up
      </Button>
      <Error error={errMsg}/>
      <div className={s.registration_license}>
        By signing up, you agree to our Terms, Data Policy and Cookies Policy.
      </div>
    </div>
  )
}

export default RegistrationCard
