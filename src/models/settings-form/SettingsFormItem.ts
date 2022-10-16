export default class SettingsFormItem {
	constructor(obj?: Partial<SettingsFormItem>) {
		if (obj) Object.assign(this, obj)
	}
	Type!: EnumSettingsFormItemType
	Value?: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	SetValue?: (value: any) => void
	Label: string
	IsLoading: boolean = false
	Placeholder: string
	Required: boolean = false
	Minimalistic: boolean = false
	MarginBottom: string
	PaddingForTitle: boolean = true
	InputType: string = 'text'
	ErrorInput: string
}

export enum EnumSettingsFormItemType {
	AvatarWithEdit,
	AvatarWithoutEdit,
	Description,
	Input,
	Textarea,
	Heading,
}
