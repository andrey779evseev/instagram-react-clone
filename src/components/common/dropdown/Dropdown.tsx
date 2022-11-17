import { PropsWithChildren, memo, useState } from 'react'
import useClickOutside from '@hooks/UseClickOutside'
import DropdownItemModel from '@models/dropdown/DropdownItemModel'
import s from './Dropdown.module.scss'
import DropdownItem from './DropdownItem'

type PropsType = PropsWithChildren<{
	items: DropdownItemModel[]
	minWidth?: number
}>

const Dropdown = (props: PropsType) => {
	const { children, items, minWidth = 230 } = props
	const [visible, setVisible] = useState(false)
	const clickOutsideRef = useClickOutside(() => setVisible(false))

	return (
		<div className='relative' ref={clickOutsideRef}>
			<div onClick={() => setVisible(!visible)}>{children}</div>
			<div
				className={`${s.dropdown_container} ${visible && s.visible}`}
				style={{ minWidth: minWidth + 'px' }}
			>
				<div className={s.triangle}></div>
				<div className='flex flex-col'>
					{items.map((item, i) => (
						<DropdownItem key={i} item={item} setVisible={setVisible} />
					))}
				</div>
			</div>
		</div>
	)
}

export default memo(Dropdown)
