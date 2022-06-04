import {
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  useTheme,
} from '@mui/material'
import { Queries } from '../../shared/api/queries'

interface PlaylistSelectorProps {
  onPlaylistSelect: (playlist: SpotifyApi.PlaylistObjectFull) => void
}

const LABEL_ID = 'playlist'

const PlaylistSelector: React.FunctionComponent<PlaylistSelectorProps> = ({
  onPlaylistSelect,
}) => {
  const playlists = Queries.playlists.useCurrentUserPlaylists()
  const theme = useTheme()

  const inputStyle = {
    display: 'block',
    marginBottom: theme.spacing(2),
    maxHeight: '500px',
  }

  const handlePlaylistSelect = (e: SelectChangeEvent) => {
    const playlistId = e.target.value as string

    const playlist = playlists.data?.items?.find((p) => p.id === playlistId)
    if (playlist) {
      onPlaylistSelect(playlist)
    }
  }

  return (
    <>
      <FormControl variant='filled' fullWidth>
        <InputLabel id={LABEL_ID}>Choose a Playlist</InputLabel>
        <Select
          label='Playlist'
          labelId={LABEL_ID}
          sx={inputStyle}
          onChange={handlePlaylistSelect}
        >
          {playlists.data?.items?.map((playlist) => (
            <MenuItem key={playlist.id} value={playlist.id}>
              <Avatar
                variant='square'
                sx={{ width: 56, height: 56, marginRight: theme.spacing(2) }}
                src={playlist.images[0].url}
              />
              {playlist.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}

export default PlaylistSelector
