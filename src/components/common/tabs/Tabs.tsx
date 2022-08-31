import TabItem from '@models/tabs/TabItem'
import {memo, useMemo, useState} from 'react'
import './Tabs.scss'


type PropsType = {
  items: TabItem[]
  initialActive?: number
}

const Tabs: React.FC<PropsType> = memo((props) => {
  const {
    items, 
    initialActive = items[0].Id
  } = props
  const [active, setActive] = useState(initialActive)

  const element = useMemo(() => {
    return items.find(x => x.Id === active)?.Element
  }, [items, active])

  return (
    <div className="tabs_wrapper">
      <div className='tabs_container flex'>
        {items.map(tab => (
          <div 
            key={tab.Id} 
            className={`tab_item ${tab.Id === active && 'active'}`}
          >
            <span className='text-xs font-medium'>
              {tab.Name}
            </span>
          </div>
        ))}
      </div>
      {element}
    </div>
  )
})

export default Tabs
