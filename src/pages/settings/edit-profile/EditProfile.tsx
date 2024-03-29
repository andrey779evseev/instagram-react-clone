import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import Button from '@components/common/button/Button'
import If from '@components/common/if/If'
import SettingsForm from '@components/settings/settings-form/SettingsForm'
import { base64ToBlob } from '@utils/Base64ToBlob'
import useDebounce from '@hooks/UseDebounce'
import {
	SetAvatarAsync,
	UpdateUserAsync,
	useCheckNicknameQuery,
	useCurrentUserQuery,
} from '@api/services/user/UserService'
import SettingsFormItem, {
	EnumSettingsFormItemType,
} from '@models/settings-form/SettingsFormItem'
import { ObjectUrlFileType, fileToUrl } from '../../../utils/FileToUrl'
import AvatarCrop from './avatar-crop/AvatarCrop'

const EditProfile = () => {
	const { data: user } = useCurrentUserQuery()
	const qc = useQueryClient()
	const [avatar, setAvatar] = useState('')
	const [name, setName] = useState('')
	const [nickname, setNickname] = useState('')
	const [description, setDescription] = useState('')
	const [email, setEmail] = useState('')
	const [gender, setGender] = useState('')
	const [cropUrl, setCropUrl] = useState<ObjectUrlFileType | null>(null)
	const [filename, setFilename] = useState<string | null>(null)
	const [isVisibleCrop, setIsVisibleCrop] = useState(false)
	const debouncedNickname = useDebounce(nickname, 500)

	const setAvatarMutation = useMutation({ mutationFn: (data: FormData) => SetAvatarAsync({ Data: data }), onSuccess: async (res) => {
		setAvatar(res)
		qc.setQueryData(['user'], { ...user!, Avatar: res })
		closeCrop()
	} })
	const updateUserMutation = useMutation({ mutationFn: UpdateUserAsync, onSuccess: (res) => {
		qc.setQueryData(['user'], res)
	} })
	const { data: validNickname } = useCheckNicknameQuery(
		debouncedNickname,
		debouncedNickname !== '' && debouncedNickname !== user?.Nickname
	)

	useEffect(() => {
		if (!user) return
		setName(user.Name)
		setNickname(user.Nickname)
		setEmail(user.Email)
		setDescription(user.Description)
		setGender(user.Gender)
		setAvatar(user.Avatar)
	}, [user])

	const openCrop = (file: File) => {
		const url = fileToUrl(file)
		setCropUrl(url)
		setFilename(file.name)
	}

	const closeCrop = () => {
		cropUrl?.revoke()
		setCropUrl(null)
		setFilename(null)
		setIsVisibleCrop(false)
	}

	const saveAvatar = (base64: string) => {
		const blob = base64ToBlob(base64)
		const formData = new FormData()
		formData.append('file', blob, filename!)
		setAvatarMutation.mutate(formData)
	}

	const items: SettingsFormItem[] = useMemo(() => {
		return [
			new SettingsFormItem({
				Type: EnumSettingsFormItemType.AvatarWithEdit,
				Value: avatar,
				SetValue: openCrop,
				Label: nickname,
				MarginBottom: '!mb-4',
			}),
			new SettingsFormItem({
				Type: EnumSettingsFormItemType.Input,
				Value: name,
				SetValue: setName,
				Label: 'Name',
				Placeholder: 'Name',
				Minimalistic: true,
				Required: true,
			}),
			new SettingsFormItem({
				Type: EnumSettingsFormItemType.Description,
				Value: `To help people discover your account, use the name people know you by, whether it's your full name, nickname, or business name.
            <br/><br/>
            You can only change your name twice within a 14-day period.`,
			}),
			new SettingsFormItem({
				Type: EnumSettingsFormItemType.Input,
				Value: nickname,
				SetValue: setNickname,
				Label: 'Nickname',
				Placeholder: 'Nickname',
				Required: true,
				Minimalistic: true,
				ErrorInput:
					validNickname === false ? 'This nickname is already taken' : '',
			}),
			new SettingsFormItem({
				Type: EnumSettingsFormItemType.Description,
				Value: `In most cases, you will be able to change your username back to ${user?.Nickname} for an additional 14 days. More information`,
			}),
			new SettingsFormItem({
				Type: EnumSettingsFormItemType.Textarea,
				Value: description,
				SetValue: setDescription,
				Label: 'Description',
				Placeholder: '...',
				Minimalistic: true,
				MarginBottom: '!mb-8',
			}),
			new SettingsFormItem({
				Type: EnumSettingsFormItemType.Heading,
				Value: 'Personal Information',
				MarginBottom: '!mb-0',
			}),
			new SettingsFormItem({
				Type: EnumSettingsFormItemType.Description,
				Value:
					'Provide your personal information, even if the account is used for a business, a pet, etc. This information will not be kept in your public profile.',
			}),
			new SettingsFormItem({
				Type: EnumSettingsFormItemType.Input,
				Value: email,
				SetValue: setEmail,
				Label: 'Email',
				Placeholder: 'Email',
				Required: true,
				Minimalistic: true,
			}),
			new SettingsFormItem({
				Type: EnumSettingsFormItemType.Input,
				Value: gender,
				SetValue: setGender,
				Label: 'Gender',
				Placeholder: 'Gender',
				Minimalistic: true,
			}),
		]
	}, [avatar, setAvatarMutation, name, nickname, description, email, gender])

	const hasChanges = useMemo(() => {
		return (
			user!.Name !== name ||
			user!.Nickname !== nickname ||
			user!.Email !== email ||
			user!.Description !== description ||
			user!.Gender !== gender
		)
	}, [user, name, nickname, email, description, gender])

	const disabledSendButton = useMemo(() => {
		return (
			name === '' ||
			nickname === '' ||
			email === '' ||
			!hasChanges ||
			validNickname === false
		)
	}, [name, nickname, email, hasChanges, validNickname])

	const saveChanges = () => {
		updateUserMutation.mutate({
			Name: name,
			Nickname: nickname,
			Email: email,
			Description: description,
			Gender: gender,
		})
	}

	const deactivateAccount = () => {
		alert('deactivate account')
	}

	return (
		<div className='h-full w-full py-8 pl-20 pr-[150px]'>
			<SettingsForm items={items}>
				<div className='mt-[29px] flex items-center justify-between'>
					<Button
						isLoading={updateUserMutation.isLoading}
						disabled={disabledSendButton}
						onClick={saveChanges}
						width='fit-content'
					>
						Send
					</Button>
					<span
						className='text-cobalt cursor-pointer font-medium'
						onClick={deactivateAccount}
					>
						Temporarily deactivate my account
					</span>
				</div>
			</SettingsForm>
			<If condition={cropUrl !== null}>
				<AvatarCrop
					onCrop={saveAvatar}
					image={cropUrl?.url as string}
					isLoading={setAvatarMutation.isLoading}
					onClose={closeCrop}
					onLoadImage={() => setIsVisibleCrop(true)}
					className={`${
						isVisibleCrop ? '!opacity-100' : '!opacity-0'
					} !transition-opacity`}
				/>
			</If>
		</div>
	)
}

export default EditProfile
