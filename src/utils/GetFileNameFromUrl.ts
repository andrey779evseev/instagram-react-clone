export const getFileNameFromUrl = (url?: string | null) => {
	return (
		// eslint-disable-next-line no-useless-escape
		url?.substring(url?.lastIndexOf('/') + 1).replace(/[\#\?].*$/, '') ??
		'defaultName'
	)
}
