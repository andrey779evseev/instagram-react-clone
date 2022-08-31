const addDotsToNumber = (num: number): string => {
  const str = `${num}`
  let result = ''
  const triplesCount = Math.floor(str.length / 3)
  str.split('').reverse().forEach((x, i) => {
    result = x + result
    if((i+1)%3===0)
      result = '.' + result
  })
  return result
}


export default addDotsToNumber