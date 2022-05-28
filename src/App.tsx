import axios from 'axios'
import React, { useEffect, useState } from 'react'

const BASE_SPOTIFY_ACCOUNTS_URI = 'https://accounts.spotify.com'
const BASE_SPOTIFY_API_URI = 'https://api.spotify.com/v1'
const AUTHORIZE_ENDPOINT = `${BASE_SPOTIFY_ACCOUNTS_URI}/authorize`
const MY_TOP_TRACKS_ENDPOINT = `${BASE_SPOTIFY_API_URI}/me/top/tracks/`

const CLIENT_ID = '5e6cead388534d1d86fc41a02419a791'
const REDIRECT_URI = 'http://localhost:3000/'
const SCOPES = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-top-read',
].join(' ')

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

function App() {
  const [token, setToken] = useState<string>()
  const [tokenType, setTokenType] = useState<string>()
  const [topTracks, setTopTracks] = useState<SpotifyApi.TrackObjectFull[]>()
  const [nextUrl, setNextUrl] = useState<string>()
  const [previousUrl, setPreviousUrl] = useState<string>()

  useEffect(() => {
    const params = getSpotifyAuthParams()
    const { access_token, token_type, expires_in } = params
    setToken(access_token)
    setTokenType(token_type)

    localStorage.clear()
    localStorage.setItem('accessToken', access_token)
    localStorage.setItem('tokenType', token_type)
    localStorage.setItem('expiresIn', expires_in)
  })

  const loadTopTracks = async () => {
    const url = MY_TOP_TRACKS_ENDPOINT
    const response = await axios.get<SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull>>(
      url,
      {
        headers: {
          Authorization: `${tokenType} ${token}`,
        },
      }
    )
    console.log('response.data :>> ', response.data)
    setTopTracks(response.data.items)
    if (response.data.next) setNextUrl(response.data.next)
    if (response.data.previous) setPreviousUrl(response.data.previous)
  }

  const loadNextTopTracksPage = async () => {
    if (!nextUrl) return

    const url = nextUrl || ''
    const response = await axios.get<SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull>>(
      url,
      {
        headers: {
          Authorization: `${tokenType} ${token}`,
        },
      }
    )
    setTopTracks(response.data.items)
    if (response.data.next) setNextUrl(response.data.next)
    if (response.data.previous) setPreviousUrl(response.data.previous)
  }

  const loadPreviousTopTracksPage = async () => {
    if (!previousUrl) return

    const url = previousUrl || ''
    const response = await axios.get<SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull>>(
      url,
      {
        headers: {
          Authorization: `${tokenType} ${token}`,
        },
      }
    )
    setTopTracks(response.data.items)
    if (response.data.next) setNextUrl(response.data.next)
    if (response.data.previous) setPreviousUrl(response.data.previous)
  }

  return (
    <>
      <h1>Spotify Login</h1>
      <button onClick={login}>Login to Spotify</button>
      <button onClick={loadTopTracks}>Load Top Tracks</button>
      <button onClick={loadPreviousTopTracksPage}>Previous page</button>
      <button onClick={loadNextTopTracksPage}>Next page</button>
      <h1>Top tracks</h1>
      <ul>
        {topTracks?.map((track) => (
          <li key={track.id}>
            <p>
              {track.name} <strong>by</strong> {track.artists[0].name}
            </p>
            <p>{track.preview_url}</p>
            <img width={150} src={track.album.images[0].url} alt='' />
            <audio controls>
              <source src={track.preview_url || ''} type='audio/mp3' />
            </audio>
            <br />
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
