import { useQuery } from 'react-query'
import { ApiSettings } from '../../settings'
import { Fetchers } from '../fetchers'

export const useCurrentUserPlaylists = () => {
  return useQuery<SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectFull>>(
    [ApiSettings.BASE_NAMES.PLAYLISTS],
    () => Fetchers.playlists.fetchCurrentUserPlaylists()
  )
}
