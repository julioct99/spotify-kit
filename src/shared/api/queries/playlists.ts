import { useQuery } from 'react-query'

import { Fetchers } from '@fetchers'
import { ApiSettings } from '@settings'

export const useCurrentUserPlaylists = () => {
  return useQuery<SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectFull>>(
    [ApiSettings.BASE_NAMES.PLAYLISTS],
    () => Fetchers.playlists.fetchCurrentUserPlaylists()
  )
}
