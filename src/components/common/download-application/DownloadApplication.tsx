import appStoreBadge from '@assets/img/common/app-store-badge.svg'
import googlePlayBadge from '@assets/img/common/google-play-badge.png'

const DownloadApplication = () => {
	return (
		<div className='w-full flex flex-col items-center'>
			<div className='download_tip'>Download the application</div>
			<div className='flex mt-5 w-full justify-center'>
				<img
					src={appStoreBadge}
					className='mr-2 cursor-pointer'
					alt='app_store_badge'
				/>
				<img
					src={googlePlayBadge}
					className='w-[120px] cursor-pointer'
					alt='google_play_badge'
				/>
			</div>
		</div>
	)
}

export default DownloadApplication
