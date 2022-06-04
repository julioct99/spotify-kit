export const getSpotifyToken = (): string => {
  const token = localStorage.getItem('accessToken') || ''
  const tokenType = localStorage.getItem('tokenType') || ''
  console.log('SPOTIFY TOKEN:', `${tokenType} ${token}`)
  return `${tokenType} ${token}`
}
