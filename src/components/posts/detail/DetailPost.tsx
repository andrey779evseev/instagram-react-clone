import CommentModel from '@api/common/models/responses/CommentModel'
import { PostService } from '@api/services/post/PostService'
import Modal from '@components/common/modal/Modal'
import Skeleton from '@components/common/skeleton/Skeleton'
import SkeletonWrapper from '@components/common/skeleton/SkeletonWrapper'
import PostCommentsList from '@components/posts/detail/comments/PostCommentsList'
import DetailPostFooter from '@components/posts/detail/footer/DetailPostFooter'
import DetailPostHeader from '@components/posts/detail/header/DetailPostHeader'
import useWindowSize from '@hooks/UseWindowSize'
import { useQuery } from '@tanstack/react-query'
import { memo, useMemo } from 'react'
import AddCommentForm from '../post/footer/add-comment-form/AddCommentForm'

type PropsType = {
  id: string
  onClose: () => void
}

const DetailPost = (props: PropsType) => {
  const { id, onClose } = props
  const aspectRatio = 1 / 2.2
  const [maxWidth, maxHeight] = useWindowSize()

  const { data: post, isLoading: isLoadingPost } = useQuery(['post', id], () =>
    PostService.GetPost(id)
  )
  const { data: commentsData, isLoading: isLoadingComments } = useQuery(
    ['comments', id],
    () => PostService.GetComments(id)
  )

  const isLoading = useMemo(
    () => isLoadingPost || isLoadingComments,
    [isLoadingPost, isLoadingComments]
  )

  const styles = useMemo(() => {
    let width = maxWidth - 48
    let height = width * aspectRatio
    if (height > maxHeight - 48) {
      height = maxHeight - 48
      width = height / aspectRatio
    }
    return {
      height: height + 'px',
      width: width + 'px'
    }
  }, [maxHeight, maxWidth])

  const comments = useMemo(() => {
    if (isLoading) return []
    return [
      {
        Text: post?.Description,
        Author: post?.Author,
        CommentedAt: post?.PostedAt,
        PostId: id,
        CommentId: ''
      },
      ...commentsData!
    ] as CommentModel[]
  }, [commentsData, post])

  return (
    <Modal width={styles.width} height={styles.height} onClose={onClose}>
      <div className='w-1/2'>
        <SkeletonWrapper
          condition={isLoading}
          skeleton={
            <Skeleton height='100%' width='100%' variant='rectangular' />
          }
          full
        >
          <div
            className='bg-image-contain w-full h-full bg-black'
            style={{ backgroundImage: `url('${post?.Photo}')` }}
          />
        </SkeletonWrapper>
      </div>
      <div className='w-1/2 h-full flex flex-col justify-between'>
        <DetailPostHeader
          isLoading={isLoading}
          nickname={post?.Author.Nickname}
          avatar={post?.Author.Avatar}
        />
        <PostCommentsList
          comments={comments}
          avatar={post?.Author.Avatar}
          isLoading={isLoading}
        />
        <DetailPostFooter
          postedAt={post?.PostedAt}
          isLoading={isLoading}
          likesInfo={post?.LikesInfo}
        />
        <AddCommentForm />
      </div>
    </Modal>
  )
}

export default memo(DetailPost)
