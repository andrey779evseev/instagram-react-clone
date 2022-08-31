import Tabs from '@components/common/tabs/Tabs'
import ProfileHeader from '@components/profile/profile-header/ProfileHeader'
import TabItem from '@models/tabs/TabItem'


const Profile: React.FC = () => {
  return (
    <div className='profile_container'>
      <ProfileHeader/>
      <Tabs items={[new TabItem({Id: 1, Name: 'posts', Element: <div></div>})]}/>
    </div>
  )
}

export default Profile