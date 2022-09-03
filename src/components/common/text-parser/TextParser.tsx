import { memo, useMemo } from 'react'


type PropsType = {
  text: string
  withNewLines?: boolean
}

const TextParser = memo((props: PropsType) => {
  const {
    text,
    withNewLines = true
  } = props

  const innerText = useMemo(() => {
    return withNewLines ? text.replaceAll('\n', '<br/>') : text
  }, [text, withNewLines])

  return (
    <div dangerouslySetInnerHTML={{__html: innerText}}/>
  )
})

export default TextParser