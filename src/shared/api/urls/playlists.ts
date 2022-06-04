import { RestUrls } from '.'

export const PlaylistsUrls = {
  getUserPlaylists: (userId: string) => `${RestUrls.users.get(userId)}/playlists`,
  getCurrentUserPlaylists: () => `${RestUrls.users.me()}/playlists?limit=50`,
}
