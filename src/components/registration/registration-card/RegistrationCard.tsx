import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useUpdateAtom } from 'jotai/utils'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InstagramTitle from '@components/common/assets/InstagramTitle'
import Button from '@components/common/button/Button'
import DividerWithText from '@components/common/divider-with-text/DividerWithText'
import Error from '@components/common/error/Error'
import GoogleSignInBtn from '@components/common/google-sign-in-btn/GoogleSignInBtn'
import Input from '@components/common/input/Input'
import useDebounce from '@hooks/UseDebounce'
import { RegisterUserAsync } from '@api/services/auth/AuthService'
import { useCheckNicknameQuery } from '@api/services/user/UserService'
import { CredentialsAtom } from '@store/atoms/AuthenticationAtom'
import s from './RegistrationCard.module.scss'

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

	const registerMutation = useMutation(RegisterUserAsync, {
		onSuccess: async (res) => {
			setCredentials(res)
			navigate('/login')
		},
		onError: (error: AxiosError) => {
			setErrMsg(error.response?.data as string)
		},
	})
	const { data: validNickname } = useCheckNicknameQuery(
		debouncedNickname,
		debouncedNickname !== ''
	)

	const disabledBtn = useMemo(() => {
		return (
			email === '' ||
			fullName === '' ||
			nickname === '' ||
			password === '' ||
			validNickname === false
		)
	}, [email, fullName, nickname, password, validNickname])

	const register = async () => {
		setIsLoading(true)
		registerMutation.mutate({
			Email: email,
			Password: password,
			Nickname: nickname,
			Name: fullName,
		})
	}

	return (
		<div className={s.registration_card}>
			<InstagramTitle width={183} height={57} className='mb-3' />
			<div className={s.registration_description}>
				Sign up to see photos and videos of your friends.
			</div>
			<GoogleSignInBtn setIsLoading={setIsLoading} setErrMsg={setErrMsg} />
			<DividerWithText text='OR' />
			<div className={s.form_container}>
				<div className={s.input_container}>
					<Input
						value={email}
						setValue={setEmail}
						placeholder='Email'
						type='email'
						inputMode='email'
					/>
				</div>
				<div className={s.input_container}>
					<Input
						value={password}
						setValue={setPassword}
						placeholder='Password'
						type='password'
					/>
				</div>
				<div className={s.input_container}>
					<Input
						value={fullName}
						setValue={setFullName}
						placeholder='Full name'
					/>
				</div>
				<div className={s.input_container}>
					<Input
						value={nickname}
						setValue={setNickname}
						placeholder='Nickname'
						error={
							validNickname === false ? 'This nickname is already taken' : ''
						}
					/>
				</div>
			</div>
			<Button disabled={disabledBtn} isLoading={isLoading} onClick={register}>
				Sign Up
			</Button>
			<Error error={errMsg} />
			<div className={s.registration_license}>
				By signing up, you agree to our Terms, Data Policy and Cookies Policy.
			</div>
		</div>
	)
}

export default RegistrationCard
