import { Button } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { AuthObject, BASE_SPOTIFY_API_URI } from '../App'
import PlaylistSelector from './selectors/PlaylistSelector'

interface PlaylistReverserProps {
  auth: AuthObject
}

const PlaylistReverser: React.FunctionComponent<PlaylistReverserProps> = ({ auth }) => {
  const [selectedPlaylist, setSelectedPlaylist] =
    useState<SpotifyApi.PlaylistObjectFull>()

  const token = auth.access_token
  const tokenType = auth.token_type

  const getPlaylistTracks = async (playlistId: string) => {
    const playlistUrl = `${BASE_SPOTIFY_API_URI}/playlists/${playlistId}`
    const response = await axios.get<SpotifyApi.PlaylistObjectFull>(playlistUrl, {
      headers: {
        Authorization: `${tokenType} ${token}`,
      },
    })

    return response.data.tracks.items
  }

  const reversePlaylist = async () => {
    if (!selectedPlaylist) return

    const playlistId = selectedPlaylist?.id || ''

    const tracks = await getPlaylistTracks(playlistId)
    const trackUris = tracks
      .map((track: SpotifyApi.PlaylistTrackObject) => track.track?.uri)
      .reverse()
      .join(',')

    const playlistUrl = `${BASE_SPOTIFY_API_URI}/playlists/${playlistId}`

    const playlistLenght = tracks.length
    const body = {
      range_start: 0,
      insert_before: playlistLenght,
      range_length: playlistLenght,
    }
    const playlistUpdateUrl = `${playlistUrl}/tracks?uris=${trackUris}`

    await axios.put(playlistUpdateUrl, body, {
      headers: {
        Authorization: `${tokenType} ${token}`,
      },
    })
  }

  return (
    <>
      <h1>Playlist reverser</h1>
      <PlaylistSelector onPlaylistSelect={setSelectedPlaylist} />
      <Button variant='contained' onClick={reversePlaylist}>
        Reverse playlist
      </Button>
    </>
  )
}

export default PlaylistReverser
