import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useUpdateAtom } from 'jotai/utils'
import { memo, useEffect, useState } from 'react'
import {
	GoogleLoginResponse,
	GoogleLoginResponseOffline,
	useGoogleLogin,
} from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { SaveToLocalStorage } from '@utils/LocalStorage'
import { AccountService } from '@api/services/account/AccountService'
import { AuthService } from '@api/services/auth/AuthService'
import { CredentialsAtom } from '@store/atoms/AuthenticationAtom'
import GoogleIcon from '../assets/icons/GoogleIcon'
import s from './GoogleSignInBtn.module.scss'

type PropsType = {
	setIsLoading: (value: boolean) => void
	setErrMsg: (error: string) => void
}

const GoogleSignInBtn = (props: PropsType) => {
	const { setIsLoading, setErrMsg } = props
	const setCredentials = useUpdateAtom(CredentialsAtom)
	const navigate = useNavigate()
	const [isButtonClicked, setIsButtonClicked] = useState(false)
	const [googleUser, setGoogleUser] = useState<GoogleLoginResponse | null>(null)

	const googleLoginMutation = useMutation(AuthService.GoogleLogin, {
		onSuccess: async (res) => {
			setCredentials(res)
			await refetch()
			navigate('/feed')
		},
		onError: (error: AxiosError) => {
			setErrMsg(error.response?.data as string)
			setIsLoading(false)
		},
	})

	const { refetch } = useQuery({
		queryKey: ['user'],
		queryFn: AccountService.GetUser,
		enabled: false,
		retry: false,
		onSuccess: (res) => {
			SaveToLocalStorage('email', res.Email)
			setIsLoading(false)
		},
	})

	useEffect(() => {
		if (!googleUser || !isButtonClicked) return
		setIsLoading(true)
		googleLoginMutation.mutate({
			Token: googleUser!.getAuthResponse().id_token,
			Email: googleUser!.profileObj.email,
			Name: googleUser!.profileObj.name,
			Avatar: googleUser!.profileObj.imageUrl,
		})
	}, [googleUser, isButtonClicked])

	const login = () => {
		setIsButtonClicked(true)
		if (!googleUser) signIn()
	}

	const onSuccess = (res: GoogleLoginResponse) => {
		setGoogleUser(res)
	}

	const onFailure = (err: unknown) => {
		console.log('google login failed:', err)
	}

	const { signIn } = useGoogleLogin({
		onSuccess: onSuccess as (
			res: GoogleLoginResponse | GoogleLoginResponseOffline
		) => void,
		clientId: import.meta.env.VITE_GOOGLE_SIGNIN_CLIENT_ID,
		cookiePolicy: 'single_host_origin',
		isSignedIn: true,
		onFailure,
	})

	return (
		<div className={s.google_sign_in_btn} onClick={login}>
			<GoogleIcon className={s.logo} />
			Continue with google
		</div>
	)
}

export default memo(GoogleSignInBtn)
