import * as dayjs from 'dayjs'

export const formatDate = (date: Date | string | undefined, format: string) => {
	if (!date) return ''
	return dayjs(date).format(format)
}
