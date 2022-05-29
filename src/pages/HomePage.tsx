import { useState, useEffect } from 'react'

import { PlaylistReverser, TopTracks } from '@components'

const BASE_SPOTIFY_ACCOUNTS_URI = 'https://accounts.spotify.com'
const AUTHORIZE_ENDPOINT = `${BASE_SPOTIFY_ACCOUNTS_URI}/authorize`

const CLIENT_ID = '5e6cead388534d1d86fc41a02419a791'
const REDIRECT_URI = window.location.origin.toString() + '/'

const SCOPES = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-top-read',
  'playlist-read-private',
  'playlist-modify-private',
  'playlist-modify-public',
].join(' ')

export const BASE_SPOTIFY_API_URI = 'https://api.spotify.com/v1'
export const MY_TOP_TRACKS_ENDPOINT = `${BASE_SPOTIFY_API_URI}/me/top/tracks/?time_range=long_term`

export interface AuthObject {
  access_token: string
  token_type: string
  expires_in: string
}

const getSpotifyAuthParams = () => {
  const hashContent = window.location.hash.substring(1)
  const params = new URLSearchParams(hashContent)

  let parsedParams: any = {}
  params.forEach((value, key) => (parsedParams[key] = value))
  return parsedParams
}

const login = () => {
  const params = {
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    response_type: 'token',
    show_dialog: true,
  }
  const queryParams = new URLSearchParams(params as any)

  const url = `${AUTHORIZE_ENDPOINT}?${queryParams.toString()}`
  window.location.href = url
}

function HomePage() {
  const [auth, setAuth] = useState<AuthObject>()

  useEffect(() => {
    const params = getSpotifyAuthParams()
    const { access_token, token_type, expires_in } = params
    setAuth(params)

    localStorage.clear()
    localStorage.setItem('accessToken', access_token)
    localStorage.setItem('tokenType', token_type)
    localStorage.setItem('expiresIn', expires_in)
  }, [])

  const isLoggedIn = !!auth && !!auth.access_token

  return (
    <>
      {isLoggedIn ? (
        <>
          <TopTracks auth={auth} />
          <PlaylistReverser auth={auth} />
        </>
      ) : (
        <button onClick={login}>Login to Spotify</button>
      )}
    </>
  )
}

export default HomePage
