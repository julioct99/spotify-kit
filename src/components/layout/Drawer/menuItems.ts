import { Audiotrack, Home } from '@mui/icons-material'
import { DrawerMenuItem } from '../../../shared/types'

export const MAIN_MENU_ITEMS: DrawerMenuItem[] = [
  { name: 'Home', icon: Home, link: '/' },
  // { name: 'Playlists', icon: QueueMusic, link: '/playlists' },
  { name: 'Top Tracks', icon: Audiotrack, link: '/top/tracks' },
]
