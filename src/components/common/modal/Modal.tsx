import {
  BaseSyntheticEvent,
  PropsWithChildren,
  useEffect,
  useState
} from 'react'
import { createPortal } from 'react-dom'
import Portal from '../portal/Portal'
import s from './Modal.module.scss'
import { useDeferredValue } from 'react'
import useDeffer from '@hooks/UseDeffer'
import CloseIcon from '../assets/icons/CloseIcon'
import { delay } from '@utils/Delay'
import { removeScrollBarFromBody } from '@utils/RemoveScrollBarFromBody'

type PropsType = {
  width?: string
  height?: string
  onClose?: () => void
  visible?: boolean
  className?: string
}

const Modal = (props: PropsWithChildren<PropsType>) => {
  const {
    children,
    className,
    width = '50%',
    height = '50%',
    onClose = undefined,
    visible = true
  } = props
  const [innerVisible, setInnerVisible] = useState(false)

  useEffect(() => {
    window.addEventListener('keydown', onEscKeyDown)
    const addScrollBar = removeScrollBarFromBody()
    setTimeout(() => setInnerVisible(true), 1)

    return () => {
      addScrollBar()
      window.removeEventListener('keydown', onEscKeyDown)
    }
  }, [])

  const close = async (e: BaseSyntheticEvent, withoutCheck = false) => {
    e.stopPropagation()
    if (
      ((e.target.id && e.target.id === 'modal-container') || withoutCheck) &&
      onClose !== undefined
    ) {
      setInnerVisible(false)
      await delay(350)
      onClose()
    }
  }

  const onEscKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && onClose) onClose()
    return
  }

  if (!visible) return <></>

  return (
    <Portal id='modals-root'>
      <div
        className={`${s.modal_container} ${className} ${
          innerVisible && 'show'
        }`}
        id='modal-container'
        onClick={close}
      >
        <div
          className='absolute top-4 right-4 cursor-pointer'
          id='close-icon'
          onClick={e => close(e, true)}
        >
          <CloseIcon />
        </div>
        <div
          className={s.modal_content}
          style={{
            width,
            height
          }}
        >
          {children}
        </div>
      </div>
    </Portal>
  )
}

export default Modal
