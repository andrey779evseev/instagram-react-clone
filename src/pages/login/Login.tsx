import LoginCard from '@components/login/LoginCard/LoginCard'
import ChangeAuthorizationBtn from '@components/common/change-authorization-btn/ChangeAuthorizationBtn'
import DownloadApplication from '@components/common/download-application/DownloadApplication'
import PhoneScreens from '@components/login/PhoneScreens/PhoneScreens'


const Login = () => {
  return (
    <div className="flex">
      <PhoneScreens/>
      <div className="flex flex-col w-[350px]">
        <LoginCard/>
        <div className="mt-2.5">
          <ChangeAuthorizationBtn/>
        </div>
        <div className="mt-5">
          <DownloadApplication/>
        </div>
      </div>
    </div>
  )
}

export default Login
