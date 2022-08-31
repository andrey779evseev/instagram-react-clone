import {AccountService} from '@api/services/account/AccountService'
import Avatar, {EnumAvatarSize} from '@components/common/avatar/Avatar'
import Button, {EnumButtonTheme} from '@components/common/button/Button'
import {useQuery} from '@tanstack/react-query'
import {useNavigate} from 'react-router-dom'
import './ProfileHeader.scss'
import settingsIcon from '@assets/icons/common/settings-icon.svg'


const ProfileHeader: React.FC = () => {
  const {data: user} = useQuery(['user'], AccountService.GetUser)
  const navigate = useNavigate()

  const goToEditProfile = () => {
    navigate('/settings/edit-profile')
  }

  return (
    <div className='flex justify-center'>
      <div className="flex items-center">
        <Avatar src={user?.Avatar} size={EnumAvatarSize.ExtraLarge}/>
        <div className="profile_header_info">
          <div className="flex items-center mb-6">
            <div className='profile_name'>
              {user?.Nickname}
            </div>
            <Button theme={EnumButtonTheme.Secondary} onClick={goToEditProfile}>
              Edit Profile
            </Button>
            <img src={settingsIcon} className='ml-6 w-6 h-6' />
          </div>
          <div className="flex items-center">
            <div className='text-base'>
              <span className='font-medium'>{0} </span>
              posts
            </div>
            <div className='text-base ml-10'>
              <span className='font-medium'>{0} </span>
              followers
            </div>
            <div className='text-base ml-10'>
              <span className='font-medium'>{0} </span>
              following
            </div>
          </div>
          <div className="mt-6 font-medium text-base">{user?.Name}</div>
          <div className="text-base">{user?.Description}</div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
