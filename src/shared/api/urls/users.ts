import { RestUrls } from '.'

export const UsersUrls = {
  get: (userId: string) => `${RestUrls.spotify.base()}/users/${userId}`,
  me: () => `${RestUrls.spotify.base()}/me`,
  currentUsertopTracks: () => `${RestUrls.users.me()}/top/tracks`,
  currentUsertopArtists: () => `${RestUrls.users.me()}/top/artists`,
}
