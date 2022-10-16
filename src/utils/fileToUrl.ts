export type ObjectUrlFileType = {
	url: string
	revoke: () => void
}

export const fileToUrl = (file: File): ObjectUrlFileType => {
	const url = window.URL.createObjectURL(file)
	return {
		url,
		revoke: () => window.URL.revokeObjectURL(url),
	}
}
