import TableIcon from '@components/common/assets/icons/TableIcon'
import Tabs from '@components/common/tabs/Tabs'
import ProfileHeader from '@components/profile/profile-header/ProfileHeader'
import TabItem from '@models/tabs/TabItem'
import { useMemo } from 'react'


const Profile = () => {
  const tabs = useMemo(() => {
    return [
      new TabItem({Name: 'posts', Route: 'posts', Icon: TableIcon})
    ]
  }, [])
  
  return (
    <div className='profile_container'>
      <div className='mb-11'>
        <ProfileHeader/>
      </div>
      <Tabs items={tabs}/>
    </div>
  )
}

export default Profile