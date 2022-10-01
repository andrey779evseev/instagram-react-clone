import jsonColors from '@utils/colors/colors.json'
import { useMemo } from 'react'


const useColor = (color: string): string => {
  const colors: {[key: string]: string} = jsonColors
  return useMemo(() => color.startsWith('#') ? color : colors[color], [color])
}


export default useColor