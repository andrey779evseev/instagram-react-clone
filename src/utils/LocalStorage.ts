export const GetFromLocalStorage = <T>(key: string): T | null => {
	if (localStorage) {
		const value = localStorage.getItem(key)
		try {
			return value ? JSON.parse(value) : null
		} catch {
			return null
		}
	} else {
		console.error(`Local storage isn't available in this browser`)
		return null
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SaveToLocalStorage = async (key: string, value: any) => {
	if (localStorage) {
		await localStorage.setItem(key, JSON.stringify(value))
	} else {
		console.error(`Local storage isn't available in this browser`)
	}
}

export const RemoveFromLocalStorage = (key: string) => {
	if (localStorage) {
		localStorage.removeItem(key)
	} else {
		console.error(`Local storage isn't available in this browser`)
	}
}
