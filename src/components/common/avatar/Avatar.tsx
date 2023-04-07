import defaultAvatar from '@assets/img/common/default-avatar.jpg'
import { memo, useMemo } from 'react'
import AsyncImage from '../async-image/AsyncImage'

type PropsType = {
	src: string | undefined | null
	size?: 'small' | 'medium' | 'big' | 'large' | 'extra-large'
}

const Avatar = (props: PropsType) => {
	const { src, size = 'large' } = props

	const avatar = useMemo(() => {
		return src ? src : defaultAvatar
	}, [src])

	const imgSize = useMemo(() => {
		switch (size) {
			case 'extra-large':
				return 150
			case 'large':
				return 56
			case 'big':
				return 38
			case 'medium':
				return 32
			default:
				return 25
		}
	}, [size])

	return (
		<>
			<AsyncImage height={imgSize} width={imgSize} url={avatar} rounded />
		</>
	)
}

export default memo(Avatar)
