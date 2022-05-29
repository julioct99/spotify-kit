import { FunctionComponent } from 'react'
import { MiniDrawer } from '@components/layout'

interface LayoutProps {
  children: JSX.Element
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return <MiniDrawer pageContent={children} />
}

export default Layout
