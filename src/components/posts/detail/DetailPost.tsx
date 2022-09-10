import Skeleton from '@components/common/skeleton/Skeleton'
import s from './DetailPost.module.scss'


const DetailPost = () => {
  const isLoading = true
  return (
    <div className={s.detail_post_container}>
      <div className={s.detail_post_content}>
        <div className={s.detail_post_photo_container}>
          {
            isLoading ?
            <Skeleton height='100%' width='100%' variant='rectangular'/> :
            <div className={s.detail_post_photo} style={{}}/>
          }
        </div>
      </div>
    </div>
  )
}

export default DetailPost