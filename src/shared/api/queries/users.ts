import { useQuery } from 'react-query'

import { ApiSettings } from '../../settings'
import { fetchCurrentUserTopArtists, fetchCurrentUserTopTracks } from '../fetchers/users'

export const useCurrentUserTopTracks = () => {
  return useQuery<SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull>>(
    [ApiSettings.BASE_NAMES.USERS, ApiSettings.BASE_NAMES.TOP_TRACKS],
    () => fetchCurrentUserTopTracks()
  )
}

export const useCurrentUserTopArtists = () => {
  return useQuery<SpotifyApi.PagingObject<SpotifyApi.ArtistObjectFull>>(
    [ApiSettings.BASE_NAMES.USERS, ApiSettings.BASE_NAMES.TOP_ARTISTS],
    () => fetchCurrentUserTopArtists()
  )
}
