import {memo, useState} from 'react'
import './Dropdown.scss'
import DropdownItem from '@models/dropdown/DropdownItem'
import useClickOutside from '@hooks/UseClickOutside'
import LittleLoading from '@components/common/little-loading/LittleLoading'
import If from '@components/common/if/If'

type PropsType = {
  children: JSX.Element
  items: DropdownItem[]
  minWidth?: number
}

const Dropdown = memo((props: PropsType) => {
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
        <div className={`dropdown_container ${visible ? 'visible' : ''}`} style={{minWidth: minWidth + 'px'}}>
          <div className='triangle'></div>
          <div className='flex flex-col'>
            {items.map((item, i) => (
              <div key={i} className='item_wrapper'>
                {item.IsDivider ?
                  <div className='dropdown_divider'></div> :
                  <div className='item' onClick={() => callback(item)}>
                    <If condition={!!item.Image}>
                      <img src={item.Image} className='mr-2.5'/>
                    </If>
                    <div className='dropdown_item_title'>
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
})


export default Dropdown
