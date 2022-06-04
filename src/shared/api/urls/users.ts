import { RestUrls } from '.'

export const UsersUrls = {
  get: (userId: string) => `${RestUrls.spotify.base()}/users/${userId}`,
  me: () => `${RestUrls.spotify.base()}/me`,
}
