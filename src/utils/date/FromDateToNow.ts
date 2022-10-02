import * as dayjs from 'dayjs'


export const fromDateToNow = (date: Date | string | undefined) => {
  if (!date) return ''
  // console.log(str)
  // const arr = str.split(' ')
  // const time = arr[0]
  // //getting first character of relative time label
  // const s = arr[1][0]
  return dayjs(date).from(dayjs())
}
