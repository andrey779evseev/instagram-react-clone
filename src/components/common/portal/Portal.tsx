import { memo, PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'


type PropsType = {
  id: string
}

const Portal = (props: PropsWithChildren<PropsType>) => {
  const {id, children} = props
  const [element, setElement] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    let el = document.getElementById(id) as HTMLDivElement
    if(!el)
      el = createWrapperAndAppendToBody()
    setElement(el)
  }, [element])

  const createWrapperAndAppendToBody = () => {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute("id", id);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
  }

  if(!element) return <></>

  return createPortal(children, element);
}

export default memo(Portal)