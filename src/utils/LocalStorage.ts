
export const GetFromLocalStorage = <T>(key: string) : T | null => {
  if(localStorage) {
    const value = localStorage.getItem(key)
    try {
      return  value ? JSON.parse(value) : null
    } catch {
      return null
    }
  } else {
    console.error(`Localstorage isn't available in this browser`)
    return null
  }
}

export const SaveToLocalStorage = async (key: string, value: any) => {
  if(localStorage) {
    await localStorage.setItem(key, JSON.stringify(value))
  } else {
    console.error(`Localstorage isn't available in this browser`)
  }
}

export const RemoveFromLocalStorage = (key: string) => {
  if(localStorage) {
    localStorage.removeItem(key)
  } else {
    console.error(`Localstorage isn't available in this browser`)
  }
}
