export const removeScrollBarFromBody = () => {
	document.body.style.top = `-${window.scrollY}px`
	document.body.style.position = 'fixed'
	if (window.innerWidth > 768) {
		document.body.style.paddingRight = '15px'
		document.body.style.backgroundColor = '#F9F9F9'
	}

	return () => {
		const scrollY = document.body.style.top
		document.body.style.paddingRight = ''
		document.body.style.position = ''
		document.body.style.top = ''
		window.scrollTo(0, parseInt(scrollY || '0') * -1)
	}
}
