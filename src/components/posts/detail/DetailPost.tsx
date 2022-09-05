import Skeleton from '@components/common/skeleton/Skeleton'
import s from './DetailPost.module.scss'


const DetailPost = () => {
  return (
    <div className={s.detail_post_container}>
      <div className={s.detail_post_content}>
        <div className={s.detail_post_photo}>
          <Skeleton variant='rectangular' height={100} width={100} animation='wave'/>
        </div>
      </div>
    </div>
  )
}

export default DetailPost