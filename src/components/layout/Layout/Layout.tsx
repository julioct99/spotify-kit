import { useMediaQuery, useTheme } from '@mui/material'
import { FunctionComponent } from 'react'

import MiniDrawer from '../Drawer/Drawer'
import MobileLayout from './MobileLayout'

interface LayoutProps {
  children: JSX.Element
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return isMobile ? (
    <MobileLayout pageContent={children} />
  ) : (
    <MiniDrawer pageContent={children} />
  )
}

export default Layout
