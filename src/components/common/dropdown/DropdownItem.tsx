import { memo } from 'react'
import DropdownItemModel from '@models/dropdown/DropdownItemModel'
import If from '../if/If'
import LittleLoading from '../little-loading/LittleLoading'
import s from './Dropdown.module.scss'

type PropsType = {
	item: DropdownItemModel
	setVisible: (value: false) => void
}

const DropdownItem = (props: PropsType) => {
	const { item, setVisible } = props

	const callback = (item: DropdownItemModel) => {
		item.Callback()
		if (item.CloseAfterClick) setVisible(false)
	}

	return (
		<div className={s.item_wrapper}>
			{item.IsDivider ? (
				<div className={s.dropdown_divider}></div>
			) : (
				<div className={s.item} onClick={() => callback(item)}>
					{item.Image &&
						(typeof item.Image === 'string' ? (
							<img src={item.Image} className='mr-2.5' alt={item.Name} />
						) : (
							<item.Image className='mr-2.5' />
						))}
					<div className={s.dropdown_item_title}>
						{item.Name}
						<If condition={item.IsLoading}>
							<LittleLoading color='cobalt' />
						</If>
					</div>
				</div>
			)}
		</div>
	)
}

export default memo(DropdownItem)
