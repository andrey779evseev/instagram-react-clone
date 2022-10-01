export const getFileNameFromUrl = (url?: string | null) => {
  return url?.substring(url?.lastIndexOf("/") + 1).replace(/[\#\?].*$/,'') ?? 'defaultName'
}