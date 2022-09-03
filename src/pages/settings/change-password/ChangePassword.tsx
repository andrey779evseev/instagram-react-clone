import {AccountService} from '@api/services/account/AccountService'
import {AuthService} from '@api/services/auth/AuthService'
import Button from '@components/common/button/Button'
import Error from '@components/common/error/Error'
import Success from '@components/common/success/Success'
import SettingsForm from '@components/settings/settings-form/SettingsForm'
import SettingsFormItem, {EnumSettingsFormItemType} from '@models/settings-form/SettingsFormItem'
import {useMutation, useQuery} from '@tanstack/react-query'
import {AxiosError} from 'axios'
import {useMemo, useState} from 'react'
import './ChangePassword.scss'


const ChangePassword = () => {
  const {data:user} = useQuery(['user'], AccountService.GetUser)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const changePasswordMutation = useMutation(AuthService.ChangePassword, {
    onSuccess: () => {
      setOldPassword('')
      setNewPassword('')
      setConfirmNewPassword('')
      setSuccessMessage('Password successfully changed')
      setTimeout(() => {
        setSuccessMessage('')
      }, 5000)
    },
    onError: (error: AxiosError) => {
      setErrMsg(error.response?.data as string)
    }
  })

  const items: SettingsFormItem[] = useMemo(() => {
    return [
      new SettingsFormItem({
        Type: EnumSettingsFormItemType.AvatarWithoutEdit,
        Value: user?.Avatar,
        Label: user?.Nickname,
        MarginBottom: '!mb-9',
        PaddingForTitle: false
      }),
      new SettingsFormItem({
        Type: EnumSettingsFormItemType.Input,
        Label: 'Previous password',
        Placeholder: 'Previous password',
        Value: oldPassword,
        SetValue: setOldPassword,
        PaddingForTitle: false,
        InputType: 'password'
      }),
      new SettingsFormItem({
        Type: EnumSettingsFormItemType.Input,
        Label: 'New password',
        Placeholder: 'New password',
        Value: newPassword,
        SetValue: setNewPassword,
        PaddingForTitle: false,
        InputType: 'password'
      }),
      new SettingsFormItem({
        Type: EnumSettingsFormItemType.Input,
        Label: 'Confirm new password',
        Placeholder: 'Confirm new password',
        Value: confirmNewPassword,
        SetValue: setConfirmNewPassword,
        MarginBottom: '!mb-8',
        PaddingForTitle: false,
        InputType: 'password'
      }),
    ]
  }, [
    user,
    oldPassword,
    newPassword,
    confirmNewPassword
  ])

  const disabledBtn = useMemo(() => {
    const anyPasswordEmpty = oldPassword === '' ||
      newPassword === '' ||
      confirmNewPassword === ''
    if(!anyPasswordEmpty) {
      if(oldPassword === newPassword)
        setErrMsg('Old and new password must be different')
      else if(newPassword !== confirmNewPassword)
        setErrMsg(`New password and it's confirmation don't equals`)
      else
        setErrMsg('')
    }
    return anyPasswordEmpty ||
      oldPassword === newPassword ||
      newPassword !== confirmNewPassword
  }, [
    oldPassword,
    newPassword,
    confirmNewPassword
  ])

  const changePassword = () => {
    changePasswordMutation.mutate({
      OldPassword: oldPassword,
      NewPassword: newPassword
    })
  }

  return (
    <div className='change_password_container'>
      <SettingsForm items={items}>
        <div>
          <Button
            isLoading={changePasswordMutation.isLoading}
            disabled={disabledBtn}
            width='fit-content'
            onClick={changePassword}
          >
            Change Password
          </Button>
          <div className='font-medium text-cobalt mt-7 cursor-pointer'>
            You forgot your password?
          </div>
        </div>
      </SettingsForm>
      <div className="mt-4">
        <Error error={errMsg}/>
        <Success message={successMessage}/>
      </div>
    </div>
  )
}

export default ChangePassword
