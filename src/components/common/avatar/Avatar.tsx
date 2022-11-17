import defaultAvatar from '@assets/img/common/default-avatar.jpg'
import { memo, useMemo } from 'react'
import { EnumAvatarSize } from '@models/enums/EnumAvatarSize'
import AsyncImage from '../async-image/AsyncImage'

type PropsType = {
	src: string | undefined | null
	size?: EnumAvatarSize
}

const Avatar = (props: PropsType) => {
	const { src, size = EnumAvatarSize.Large } = props

	const avatar = useMemo(() => {
		return src ? src : defaultAvatar
	}, [src])

	const imgSize = useMemo(() => {
		switch (size) {
			case EnumAvatarSize.ExtraLarge:
				return 150
			case EnumAvatarSize.Large:
				return 56
			case EnumAvatarSize.Big:
				return 38
			case EnumAvatarSize.Medium:
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
