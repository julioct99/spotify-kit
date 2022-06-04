import React, { useState } from 'react'
import axios from 'axios'

import { AudioPlayer } from '@components'
import { AuthObject, MY_TOP_TRACKS_ENDPOINT } from '../App'
import { Button, useTheme } from '@mui/material'

interface TopTracksProps {
  auth: AuthObject
}

const TopTracks: React.FunctionComponent<TopTracksProps> = ({ auth }) => {
  const [listOffset, setListOffset] = useState(0)
  const [topTracks, setTopTracks] = useState<SpotifyApi.TrackObjectFull[]>()
  const [nextUrl, setNextUrl] = useState<string>()
  const [previousUrl, setPreviousUrl] = useState<string>()

  const theme = useTheme()

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
      <Button
        variant='contained'
        sx={{ marginRight: theme.spacing(2) }}
        onClick={loadTopTracks}
      >
        Load Top Tracks
      </Button>
      <Button variant='outlined' onClick={loadPreviousTopTracksPage}>
        Previous page
      </Button>
      <Button variant='outlined' onClick={loadNextTopTracksPage}>
        Next page
      </Button>
      <h1>Top tracks</h1>
      {topTracks?.map((track, index) => (
        <AudioPlayer key={track.id} track={track} index={listOffset + index + 1} />
      ))}
    </>
  )
}

export default TopTracks
