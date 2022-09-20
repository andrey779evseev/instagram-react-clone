import {memo, PropsWithChildren, useState} from 'react'
import s from './Dropdown.module.scss'
import DropdownItem from '@models/dropdown/DropdownItem'
import useClickOutside from '@hooks/UseClickOutside'
import LittleLoading from '@components/common/little-loading/LittleLoading'
import If from '@components/common/if/If'

type PropsType = PropsWithChildren<{
  items: DropdownItem[]
  minWidth?: number
}>

const Dropdown = (props: PropsType) => {
  const {children, items, minWidth = 230} = props
  const [visible, setVisible] = useState(false)
  const clickOutsideRef = useClickOutside(() => setVisible(false))

  const callback = (item: DropdownItem) => {
    item.Callback()
    if(item.CloseAfterClick)
      setVisible(false)
  }
  return (
    <div className='relative' ref={clickOutsideRef}>
      <div onClick={() => setVisible(!visible)}>{children}</div>
        <div className={`${s.dropdown_container} ${visible && s.visible}`} style={{minWidth: minWidth + 'px'}}>
          <div className={s.triangle}></div>
          <div className='flex flex-col'>
            {items.map((item, i) => (
              <div key={i} className={s.item_wrapper}>
                {item.IsDivider ?
                  <div className={s.dropdown_divider}></div> :
                  <div className={s.item} onClick={() => callback(item)}>
                    <If condition={!!item.Image}>
                      {
                        typeof item.Image === 'string' ?
                        <img src={item.Image} className='mr-2.5'/> :
                        <item.Image className='mr-2.5'/>
                      }
                    </If>
                    <div className={s.dropdown_item_title}>
                      {item.Name}
                      <If condition={item.IsLoading}>
                        <LittleLoading/>
                      </If>
                    </div>
                  </div>
                }
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}


export default memo(Dropdown)
