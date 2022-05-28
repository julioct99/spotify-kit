export interface Track {
  artist: string
  artistLength: number
  name: string
  nameLength: number
  lengthMatches: boolean
  id: string
  albumImage: string
}

export enum SpotifyType {
  ALBUM = 'album',
  TRACK = 'track',
  ARTIST = 'artist',
  PLAYLIST = 'playlist',
}

export interface SpotifySingleTrack {
  type: SpotifyType.TRACK
  result: SpotifyApi.SingleTrackResponse
}

export interface SpotifyAlbum {
  type: SpotifyType.ALBUM
  result: SpotifyApi.SingleAlbumResponse
}

export interface SpotifyArtistTopTracks {
  type: SpotifyType.ARTIST
  result: SpotifyApi.ArtistsTopTracksResponse
}

export interface SpotifyPlaylist {
  type: SpotifyType.PLAYLIST
  result: SpotifyApi.SinglePlaylistResponse
}

export type SpotifyApiTypeAndResult =
  | SpotifySingleTrack
  | SpotifyAlbum
  | SpotifyArtistTopTracks
  | SpotifyPlaylist
