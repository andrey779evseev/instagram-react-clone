import { PropsWithChildren, memo } from 'react'
import Avatar, { EnumAvatarSize } from '@components/common/avatar/Avatar'
import If from '@components/common/if/If'
import Input from '@components/common/input/Input'
import Skeleton from '@components/common/skeleton/Skeleton'
import SkeletonWrapper from '@components/common/skeleton/SkeletonWrapper'
import Textarea from '@components/common/teaxtarea/Textarea'
import UploadImage from '@components/common/upload-image/UploadImage'
import SettingsFormItem, {
	EnumSettingsFormItemType,
} from '@models/settings-form/SettingsFormItem'
import s from './SettingsForm.module.scss'

type PropsType = PropsWithChildren<{
	items: SettingsFormItem[]
}>

const SettingsForm = (props: PropsType) => {
	const { items, children } = props
	const isAvatar = (item: SettingsFormItem) => {
		return (
			item.Type === EnumSettingsFormItemType.AvatarWithEdit ||
			item.Type === EnumSettingsFormItemType.AvatarWithoutEdit
		)
	}
	const isAvatarWithoutEdit = (item: SettingsFormItem) => {
		return item.Type === EnumSettingsFormItemType.AvatarWithoutEdit
	}
	const isShowLabel = (item: SettingsFormItem) => {
		return (
			item.Type === EnumSettingsFormItemType.Input ||
			item.Type === EnumSettingsFormItemType.Textarea
		)
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
		<div className={s.settings_form}>
			{items.map((item, i) => (
				<div
					className={`${s.form_row} ${item.MarginBottom} ${
						!item.PaddingForTitle && '!items-center'
					}`}
					key={i}
				>
					<div
						className={`${s.label_column} ${
							!item.PaddingForTitle && s.without_margin
						}`}
					>
						<If condition={isAvatar(item)}>
							<Avatar src={item.Value} size={EnumAvatarSize.Big} />
						</If>
						<If condition={isShowLabel(item)}>
							<div className={s.label_name}>{item.Label}</div>
						</If>
					</div>
					<div className={s.data_column}>
						<If condition={isAvatar(item)}>
							<div className={s.avatar_data}>
								<div className={s.avatar_data_user_name}>
									<SkeletonWrapper
										condition={!item.Label}
										skeleton={<Skeleton variant='text' />}
									>
										<span>{item.Label}</span>
									</SkeletonWrapper>
								</div>
								<If condition={!isAvatarWithoutEdit(item)}>
									<UploadImage onUpload={item.SetValue as (file: File) => void}>
										<span className={s.avatar_data_change_photo}>
											Change profile photo
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
							<div
								className={s.data_description}
								dangerouslySetInnerHTML={{ __html: item.Value! }}
							></div>
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
							<div className={s.sub_heading}>{item.Value}</div>
						</If>
					</div>
				</div>
			))}
			<If condition={!!children}>
				<div className={s.form_row}>
					<div className={s.label_column}></div>
					<div className={s.data_column}>{children}</div>
				</div>
			</If>
		</div>
	)
}

export default memo(SettingsForm)
