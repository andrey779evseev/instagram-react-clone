import {memo} from 'react'
import './SettingsForm.scss'
import SettingsFormItem, {EnumSettingsFormItemType} from '@models/settings-form/SettingsFormItem'
import Avatar, {EnumAvatarSize} from '@components/common/avatar/Avatar'
import UploadImage from '@components/common/upload-image/UploadImage'
import LittleLoading from '@components/common/little-loading/LittleLoading'
import Input from '@components/common/input/Input'
import Textarea from '@components/common/teaxtarea/Textarea'
import If from '@components/common/if/If'


type PropsType = {
  items: SettingsFormItem[]
  children?: JSX.Element
}

const SettingsForm = memo((props: PropsType) => {
  const {items, children} = props
  const isAvatar = (item: SettingsFormItem) => {
    return item.Type === EnumSettingsFormItemType.AvatarWithEdit ||
      item.Type === EnumSettingsFormItemType.AvatarWithoutEdit
  }
  const isAvatarWithoutEdit = (item: SettingsFormItem) => {
    return item.Type === EnumSettingsFormItemType.AvatarWithoutEdit
  }
  const isShowLabel = (item: SettingsFormItem) => {
    return item.Type === EnumSettingsFormItemType.Input ||
      item.Type === EnumSettingsFormItemType.Textarea
  }
  const isInput = (item: SettingsFormItem) => {
    return item.Type === EnumSettingsFormItemType.Input
  }
  const isDescription = (item: SettingsFormItem) => {
    return item.Type === EnumSettingsFormItemType.Description
  }
  const isTextarea = (item: SettingsFormItem) => {
    return item.Type === EnumSettingsFormItemType.Textarea
  }
  const isHeading = (item: SettingsFormItem) => {
    return item.Type === EnumSettingsFormItemType.Heading
  }
  return (
    <div className='settings_form'>
      {
        items.map((item, i) => (
          <div className={`form_row ${item.MarginBottom} ${!item.PaddingForTitle && '!items-center'}`} key={i}>
            <div className={`label_column ${!item.PaddingForTitle && 'without_margin'}`}>
              <If condition={isAvatar(item)}>
                <Avatar src={item.Value} size={EnumAvatarSize.Big}/>
              </If>
              <If condition={isShowLabel(item)}>
                <div className="label_name">
                  {item.Label}
                </div>
              </If>
            </div>
            <div className="data_column">
              <If condition={isAvatar(item)}>
                <div className="avatar_data">
                  <div className="avatar_data_user_name">
                    {item.Label}
                  </div>
                  <If condition={!isAvatarWithoutEdit(item)}>
                    <UploadImage uploadImage={item.SetValue as (file: File) => void}>
                      <span className="avatar_data_change_photo">
                        Change profile photo
                        <span className="ml-2">
                          <If condition={item.IsLoading}>
                              <LittleLoading color="cobalt"/>
                          </If>
                        </span>
                      </span>
                    </UploadImage>
                  </If>
                </div>
              </If>
              <If condition={isInput(item)}>
                <Input
                  value={item.Value!}
                  setValue={item.SetValue!}
                  placeholder={item.Placeholder}
                  required={item.Required}
                  minimalistic={item.Minimalistic}
                  type={item.InputType}
                  error={item.ErrorInput}
                />
              </If>
              <If condition={isDescription(item)}>
                <div className="data_description" dangerouslySetInnerHTML={{__html: item.Value!}}></div>
              </If>
              <If condition={isTextarea(item)}>
                <Textarea
                  value={item.Value!}
                  setValue={item.SetValue!}
                  placeholder={item.Placeholder}
                  minimalistic={item.Minimalistic}
                />
              </If>
              <If condition={isHeading(item)}>
                <div className="sub_heading">
                  {item.Value}
                </div>
              </If>
            </div>
          </div>
        ))
      }
      <If condition={!!children}>
        <div className="form_row">
          <div className="label_column"></div>
          <div className="data_column">
            {children}
          </div>
        </div>
      </If>
    </div>
  )
})

export default SettingsForm
