import { useEffect, useState } from 'react'

const useIsFixedBody = () => {
	const [isFixedBody, setIsFixedBody] = useState(false)

	useEffect(() => {
		setIsFixedBody(document.body.style.position === 'fixed')
	}, [document.body.style.position])

	return isFixedBody
}

export default useIsFixedBody
