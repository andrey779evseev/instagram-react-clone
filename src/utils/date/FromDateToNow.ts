import * as dayjs from 'dayjs'

export const fromDateToNow = (date: Date | string | undefined) => {
	if (!date) return ''
	return dayjs(date).from(dayjs())
}
