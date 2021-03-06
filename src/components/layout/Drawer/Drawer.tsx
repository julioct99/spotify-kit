import React, { useState } from 'react'
import { styled, Theme, CSSObject } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import { Container, useMediaQuery, useTheme } from '@mui/material'

import { MAIN_MENU_ITEMS } from './menuItems'
import DrawerItems from './DrawerItems'
import DrawerHeader from './DrawerHeader'
import AppBar from '../AppBar/AppBar'
import { LayoutSettings } from '../../../shared/settings'

const openedMixin = (theme: Theme): CSSObject => ({
  width: LayoutSettings.DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: 0,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
})

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: LayoutSettings.DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
)

interface DrawerProps {
  pageContent: JSX.Element
}

const MiniDrawer: React.FunctionComponent<DrawerProps> = ({ pageContent }) => {
  const [open, setOpen] = useState(false)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleDrawerItemClick = () => {
    if (isMobile) handleDrawerClose()
  }

  return (
    <Box
      sx={{ display: 'flex' }}
      style={{ backgroundColor: '#E4E4E4', minHeight: '100vh', height: 'fit-content' }}
      paddingBottom={6}
    >
      <CssBaseline />
      <AppBar open={open} onDrawerOpen={handleDrawerOpen} />
      <Drawer variant='permanent' open={open}>
        <DrawerHeader onDrawerClose={handleDrawerClose} />
        <DrawerItems
          onItemClick={handleDrawerItemClick}
          drawerOpen={open}
          items={MAIN_MENU_ITEMS}
        />
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }} marginTop={10}>
        <Container>{pageContent}</Container>
      </Box>
    </Box>
  )
}

export default MiniDrawer
