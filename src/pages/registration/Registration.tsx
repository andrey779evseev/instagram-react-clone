import RegistrationCard from '@components/registration/registration-card/RegistrationCard'
import ChangeAuthorizationBtn from '@components/common/change-authorization-btn/ChangeAuthorizationBtn'
import DownloadApplication from '@components/common/download-application/DownloadApplication'


const Registration: React.FC = () => {
  return (
    <div className='py-5'>
      <RegistrationCard/>
      <div className="mt-2.5">
        <ChangeAuthorizationBtn signIn={true}/>
      </div>
      <div className="mt-5">
        <DownloadApplication/>
      </div>
    </div>
  )
}

export default Registration
