import googlePlayBadge from '@assets/icons/common/google-play-badge.png'
import appStoreBadge from '@assets/icons/common/app-store-badge.svg'

const DownloadApplication: React.FC = () => {
  return (
    <div className='w-full flex flex-col items-center'>
      <div className="download_tip">Download the application</div>
      <div className="flex mt-5 w-full justify-center">
        <img src={appStoreBadge} className='mr-2 cursor-pointer'/>
        <img src={googlePlayBadge} className='w-[120px] cursor-pointer'/>
      </div>
    </div>
  )
}

export default DownloadApplication
