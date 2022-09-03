import TabItem from '@models/tabs/TabItem'
import {memo, useEffect, useMemo, useState} from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import If from '../if/If'
import './Tabs.scss'


type PropsType = {
  items: TabItem[]
  initialActive?: string
}

const Tabs = memo((props: PropsType) => {
  const {
    items, 
    initialActive = items[0].Route
  } = props
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if(items && !items.some(x => location.pathname.includes(x.Route)))
      navigate(initialActive)
  }, []) 

  return (
    <div className="tabs_wrapper">
      <div className='tabs_container'>
        {items.map(tab => (
          <NavLink 
            to={tab.Route}
            key={tab.Route} 
            className={`tab_item`}
          >
            <If condition={!!tab.Icon}>
              <img src={tab.Icon} />
            </If>
            <span className='text-xs font-medium'>
              {tab.Name}
            </span>
          </NavLink>
        ))}
      </div>
      <Outlet/>
    </div>
  )
})

export default Tabs
