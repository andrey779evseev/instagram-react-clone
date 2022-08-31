export default class SettingsFormItem {
  constructor(obj?: Partial<SettingsFormItem>) {
    if(obj)
      Object.assign(this, obj)
  }
  Type!: EnumSettingsFormItemType
  Value?: string
  SetValue?: Function
  Label: string = ''
  IsLoading: boolean = false
  Placeholder: string = ''
  Required: boolean = false
  Minimalistic: boolean = false
  MarginBottom: string = ''
  PaddingForTitle: boolean = true
  InputType: string = 'text'
  ErrorInput: string = ''
}

export enum EnumSettingsFormItemType {
  AvatarWithEdit,
  AvatarWithoutEdit,
  Description,
  Input,
  Textarea,
  Heading
}
