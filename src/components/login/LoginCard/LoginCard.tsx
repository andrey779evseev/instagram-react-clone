import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InstagramTitle from '@components/common/assets/InstagramTitle'
import Button from '@components/common/button/Button'
import DividerWithText from '@components/common/divider-with-text/DividerWithText'
import Error from '@components/common/error/Error'
import GoogleSignInBtn from '@components/common/google-sign-in-btn/GoogleSignInBtn'
import Input from '@components/common/input/Input'
import { SaveToLocalStorage } from '@utils/LocalStorage'
import { LoginUserAsync } from '@api/services/auth/AuthService'
import { GetCurrentUserAsync } from '@api/services/user/UserService'
import { CredentialsAtom } from '@store/atoms/AuthenticationAtom'
import { useSetAtom } from 'jotai'

const LoginCard = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errMsg, setErrMsg] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const setCredentials = useSetAtom(CredentialsAtom)
	const navigate = useNavigate()
	const isAllowedSubmit = useMemo(
		() => email !== '' && password !== '',
		[email, password]
	)
	const { refetch } = useQuery({
		queryKey: ['user'],
		queryFn: GetCurrentUserAsync,
		enabled: false,
		retry: false,
		onSuccess: (res) => {
			SaveToLocalStorage('email', res.Email)
			setIsLoading(false)
		},
	})
	const loginMutation = useMutation({ mutationFn: LoginUserAsync, onSuccess: async (res) => {
		setCredentials(res)
		await refetch()
		navigate('/feed')
	}, onError: (error: AxiosError) => {
		setErrMsg(error.response?.data as string)
		setIsLoading(false)
	} })

	const login = () => {
		setIsLoading(true)
		loginMutation.mutate({
			Email: email,
			Password: password,
		})
	}

	return (
		<div className='border-gray10 border px-10 py-6'>
			<div className='flex flex-col items-center'>
				<InstagramTitle className='mb-6' width={183} height={57} />
				<div className='mb-3.5 w-full'>
					<Input
						value={email}
						setValue={setEmail}
						placeholder='Username, or mail'
					/>
				</div>
				<div className='mb-2.5 w-full'>
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
				<Error error={errMsg} />
				<DividerWithText text='OR' />
				<GoogleSignInBtn setIsLoading={setIsLoading} setErrMsg={setErrMsg} />
				<div className='text-cobalt mt-5 text-xs'>You forgot the password?</div>
			</div>
		</div>
	)
}

export default LoginCard
