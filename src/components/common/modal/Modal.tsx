import {
  BaseSyntheticEvent,
  PropsWithChildren,
  useEffect,
  useState
} from 'react'
import { createPortal } from 'react-dom'
import Portal from '../portal/Portal'
import s from './Modal.module.scss'

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

  useEffect(() => {
    document.body.style.top = `-${window.scrollY}px`
    document.body.style.position = 'fixed'

    window.addEventListener('keydown', onEscKeyDown)
    return () => {
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      window.scrollTo(0, parseInt(scrollY || '0') * -1)

      window.removeEventListener('keydown', onEscKeyDown)
    }
  }, [])

  const close = (e: BaseSyntheticEvent) => {
    e.stopPropagation()
    if (e.target.className === s.modal_container && onClose !== undefined)
      onClose()
  }

  const onEscKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && onClose) onClose()
    return
  }

  if (!visible) return <></>

  return (
    <Portal id='modals-root'>
      <div className={`${s.modal_container} ${className}`} onClick={close}>
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
