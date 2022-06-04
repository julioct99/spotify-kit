import axios from 'axios'

import { RestUrls } from '../urls'

export const fetchCurrentUserTopTracks = async () => {
  const url = RestUrls.users.currentUsertopTracks()
  const response = await axios.get<SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull>>(
    url
  )
  return response.data
}

export const fetchCurrentUserTopArtists = async () => {
  const url = RestUrls.users.currentUsertopArtists()
  const response = await axios.get<SpotifyApi.PagingObject<SpotifyApi.ArtistObjectFull>>(
    url
  )
  return response.data
}
