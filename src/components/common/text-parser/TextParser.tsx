import { memo, useMemo } from 'react'

type PropsType = {
	text: string | undefined
	withNewLines?: boolean
}

const TextParser = (props: PropsType) => {
	const { text = '', withNewLines = true } = props

	const innerText = useMemo(() => {
		return withNewLines ? text.replaceAll('\n', '<br/>') : text
	}, [text, withNewLines])

	return <div dangerouslySetInnerHTML={{ __html: innerText }} />
}

export default memo(TextParser)
