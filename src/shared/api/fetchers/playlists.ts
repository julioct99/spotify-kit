import axios from 'axios'
import { RestUrls } from '../urls'

export const fetchUserPlaylists = async (playlistId: string) => {
  const url = `${RestUrls.playlists.getUserPlaylists(playlistId)}`
  const response = await axios.get<
    SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectFull>
  >(url)
  return response.data
}

export const fetchCurrentUserPlaylists = async () => {
  const url = `${RestUrls.playlists.getCurrentUserPlaylists()}`
  const response = await axios.get<
    SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectFull>
  >(url)
  return response.data
}
