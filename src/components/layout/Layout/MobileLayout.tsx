import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'

import DrawerItems from '../Drawer/DrawerItems'
import { MAIN_MENU_ITEMS } from '../Drawer/menuItems'
import { LayoutSettings } from '../../../shared/settings'

interface MobileLayoutProps {
  pageContent: JSX.Element
}

const MobileLayout: React.FunctionComponent<MobileLayoutProps> = ({ pageContent }) => {
  const [open, setOpen] = useState(false)

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleDrawerToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  return (
    <Box
      sx={{ display: 'flex' }}
      style={{ backgroundColor: '#E4E4E4', minHeight: '100vh', height: 'fit-content' }}
      paddingBottom={6}
    >
      <CssBaseline />
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            SPOTIFY KIT
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='temporary'
        open={open}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{ width: LayoutSettings.DRAWER_WIDTH, display: 'block' }}
      >
        <DrawerItems onItemClick={() => {}} drawerOpen={open} items={MAIN_MENU_ITEMS} />
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }} marginTop={10}>
        <Container>{pageContent}</Container>
      </Box>
    </Box>
  )
}

export default MobileLayout
