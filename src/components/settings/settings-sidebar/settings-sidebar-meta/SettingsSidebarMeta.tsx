import './SettingsSidebarMeta.scss'
import metaLogo from '@assets/icons/settings/meta-logo.svg'


const SettingsSidebarMeta = () => {
  return (
    <div className="meta_info">
      <img src={metaLogo} alt=""/>
      <div className="meta_title">
        Accounts Center
      </div>
      <div className="meta_description">
        Control settings for connected experiences on Instagram, the Facebook app, and Messenger, including sharing stories and posts, and logging in.
      </div>
    </div>
  )
}

export default SettingsSidebarMeta
