export const getUnit = (input: string) => {
  return String(input).match(/[\d.\-+]*\s*(.*)/)?.[1] || ''
}

export const toUnitless = (value: string) => {
  return parseFloat(value);
}

const unitlessValues = [
  'auto',
  'max-content',
  'min-content',
  'fit-content'
]


/**
 * Function for checing if value is unitless and it is a special string value
 */
export const isSpecialUnitless = (value: string | number) => {
  if(typeof value === 'number') return false
  return unitlessValues.includes(value)
}

export const parseUnitValue = (value: string) => {
  return {
    unit: getUnit(value as string),
    value: toUnitless(value as string)
  }
}

export const getValueRelativeWindow = (value: string | number, isWidth: boolean = true) => {
  if(isUnitless(value)) return value
  //'as string', because in "isUnitless" func it check for number
  const parsed = parseUnitValue(value as string)
  if(parsed.unit === 'px') return value
  const windowValue = isWidth ? window.innerWidth : window.innerHeight
  const valueInPixels =  windowValue / 100 * (parsed.value as number)
  return valueInPixels + 'px'
}


export const isUnitless = (value: string | number) => {
  if(typeof value === 'number') return true
  if(unitlessValues.includes(value.toLowerCase().trim())) return true
  return String(parseFloat(value)).length === String(value).length;
}