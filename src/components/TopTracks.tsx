import React, { useState } from 'react'
import axios from 'axios'

import { AudioPlayer } from '@components'
import { AuthObject, MY_TOP_TRACKS_ENDPOINT } from '../App'

interface TopTracksProps {
  auth: AuthObject
}

const TopTracks: React.FunctionComponent<TopTracksProps> = ({ auth }) => {
  const [listOffset, setListOffset] = useState(0)
  const [topTracks, setTopTracks] = useState<SpotifyApi.TrackObjectFull[]>()
  const [nextUrl, setNextUrl] = useState<string>()
  const [previousUrl, setPreviousUrl] = useState<string>()

  const token = auth.access_token
  const tokenType = auth.token_type

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

    setListOffset(response.data.offset)
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

    setListOffset(response.data.offset)
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

    setListOffset(response.data.offset)
    setTopTracks(response.data.items)
    if (response.data.next) setNextUrl(response.data.next)
    if (response.data.previous) setPreviousUrl(response.data.previous)
  }

  return (
    <>
      <h1>Spotify Login</h1>
      <button onClick={loadTopTracks}>Load Top Tracks</button>
      <button onClick={loadPreviousTopTracksPage}>Previous page</button>
      <button onClick={loadNextTopTracksPage}>Next page</button>
      <h1>Top tracks</h1>
      {topTracks?.map((track, index) => (
        <AudioPlayer key={track.id} track={track} index={listOffset + index + 1} />
      ))}
    </>
  )
}

export default TopTracks
