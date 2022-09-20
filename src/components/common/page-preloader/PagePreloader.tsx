import InstagramIcon from '../assets/icons/InstagramIcon'
import s from './PagePreloader.module.scss'


const PagePreloader = () => {
  return (
    <div className={s.preloader_container}>
      <InstagramIcon/>
    </div>
  )
}

export default PagePreloader
