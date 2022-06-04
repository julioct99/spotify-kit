export const getSpotifyToken = (): string => {
  const urlToken = getSpotifyAuthParamsFromUrl().access_token
  const storageToken = localStorage.getItem('accessToken')
  const token = urlToken || storageToken

  return `Bearer ${token}`
}

const getSpotifyAuthParamsFromUrl = () => {
  const hashContent = window.location.hash.substring(1)
  const params = new URLSearchParams(hashContent)

  let parsedParams: any = {}
  params.forEach((value, key) => (parsedParams[key] = value))
  return parsedParams
}
