import useColor from '@hooks/UseColor'
import { memo } from 'react'
import Modal from '../Modal'

type PropsType = {
  title?: string
  description?: string
  firstActionTitle?: string
  firstAction?: () => void
  secondAction?: () => void
  secondActionTitle?: string
  color?: string
  onClose: () => void
}

const ConfirmationWindow = (props: PropsType) => {
  const {
    title,
    description,
    firstAction,
    secondAction,
    color: propsColor,
    onClose,
    firstActionTitle,
    secondActionTitle
  } = props

  const color = useColor(propsColor)

  return (
    <Modal
      width='fit-content'
      height='fit-content'
      minWidth='300px'
      onClose={onClose}
      rounded
    >
      <div className='w-full h-full flex flex-col'>
        <div className='flex-center flex-col flex-grow p-8 pb-4'>
          <div className='text-lg font-semibold'>{title}</div>
          <div className='text-sm mt-1 text-gray50'>{description}</div>
        </div>
        <div
          className='h-12 flex-center cursor-pointer font-bold transition-colors hover:bg-gray10 border-y border-y-gray20'
          style={{ color }}
          onClick={firstAction}
        >
          {firstActionTitle}
        </div>
        <div
          className='h-12 flex-center cursor-pointer hover:bg-gray10 transition-colors'
          onClick={secondAction}
        >
          {secondActionTitle}
        </div>
      </div>
    </Modal>
  )
}

export default memo(ConfirmationWindow)
