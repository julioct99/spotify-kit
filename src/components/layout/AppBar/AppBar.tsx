import { IconButton, styled, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'

import { LayoutSettings } from '@settings'

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
  onDrawerOpen?: () => void
}

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: LayoutSettings.DRAWER_WIDTH,
    width: `calc(100% - ${LayoutSettings.DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const AppBar: React.FunctionComponent<AppBarProps> = ({
  open,
  onDrawerOpen,
  ...muiAppBarProps
}) => (
  <StyledAppBar position='fixed' open={open} {...muiAppBarProps}>
    <Toolbar>
      <IconButton
        color='inherit'
        aria-label='open drawer'
        onClick={onDrawerOpen}
        edge='start'
        sx={{
          marginRight: '36px',
          ...(open && { display: 'none' }),
        }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant='h6' noWrap component='div'>
        SPOTIFY KIT
      </Typography>
    </Toolbar>
  </StyledAppBar>
)

export default AppBar
