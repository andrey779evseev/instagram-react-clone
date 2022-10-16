import { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { delay } from '@utils/Delay'
import {
	getValueRelativeWindow,
	isSpecialUnitless,
	parseUnitValue,
} from '@utils/Measurement'
import { removeScrollBarFromBody } from '@utils/RemoveScrollBarFromBody'
import useWindowSize from '@hooks/UseWindowSize'
import CloseIcon from '../assets/icons/CloseIcon'
import Portal from '../portal/Portal'
import s from './Modal.module.scss'

type PropsType = {
	width?: string | number
	height?: string | number
	onClose: () => void
	visible?: boolean
	className?: string
	minWidth?: string
	minHeight?: string
	aspectRatio?: number
	rounded?: boolean
	contentClassName?: string
}

const Modal = (props: PropsWithChildren<PropsType>) => {
	const {
		children,
		className,
		width = '50%',
		height = '50%',
		onClose,
		visible = true,
		minWidth = 'unset',
		minHeight = 'unset',
		aspectRatio = undefined,
		rounded = false,
		contentClassName,
	} = props
	const [innerVisible, setInnerVisible] = useState(false)
	const [windowWidth, windowHeight] = useWindowSize()

	useEffect(() => {
		window.addEventListener('keydown', onEscKeyDown)
		const addScrollBar = removeScrollBarFromBody()
		setTimeout(() => setInnerVisible(true), 1)

		return () => {
			addScrollBar()
			window.removeEventListener('keydown', onEscKeyDown)
		}
	}, [])

	const close = async (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		withoutCheck = false
	) => {
		e.stopPropagation()
		if (
			(((e.target as HTMLDivElement).id &&
				(e.target as HTMLDivElement).id === 'modal-container') ||
				withoutCheck) &&
			onClose !== undefined
		) {
			setInnerVisible(false)
			await delay(150)
			onClose()
		}
	}

	const styles = useMemo(() => {
		const res = {
			width: getValueRelativeWindow(width, windowWidth),
			height: getValueRelativeWindow(height, windowHeight),
			minHeight,
			minWidth,
			borderRadius: rounded ? '12px' : '',
		}

		if (
			aspectRatio === undefined ||
			(isSpecialUnitless(width) && isSpecialUnitless(height))
		)
			return res

		let maxWidth = typeof width === 'number' ? width : null
		let maxHeight = typeof height === 'number' ? height : null
		if (maxWidth === null && !isSpecialUnitless(width)) {
			const parsedWidth = parseUnitValue(width as string)
			maxWidth =
				parsedWidth.unit === 'px'
					? parsedWidth.value
					: (window.innerWidth / 100) * parsedWidth.value
		}
		if (maxHeight === null && !isSpecialUnitless(height)) {
			const parsedHeight = parseUnitValue(height as string)
			maxHeight =
				parsedHeight.unit === 'px'
					? parsedHeight.value
					: (window.innerHeight / 100) * parsedHeight.value
		}
		let w = 0
		let h = 0
		if (isSpecialUnitless(width)) {
			h = maxHeight as number
			w = h / aspectRatio
		} else {
			w = maxWidth as number
			h = w * aspectRatio
		}
		if (h > (maxHeight as number)) {
			h = maxHeight as number
			w = h * aspectRatio
		}
		return {
			...res,
			height: h + 'px',
			width: w + 'px',
		}
	}, [
		height,
		width,
		aspectRatio,
		minWidth,
		minHeight,
		windowWidth,
		windowHeight,
	])

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
				onMouseDown={close}
			>
				<div
					className='absolute top-4 right-4 cursor-pointer'
					id='close-icon'
					onClick={(e) => close(e, true)}
				>
					<CloseIcon />
				</div>
				<div
					className={`${s.modal_content} ${contentClassName}`}
					style={styles}
				>
					{children}
				</div>
			</div>
		</Portal>
	)
}

export default Modal
