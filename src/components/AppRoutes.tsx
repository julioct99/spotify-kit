import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages'

interface AppRoutesProps {}

const AppRoutes: React.FunctionComponent<AppRoutesProps> = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
    </Routes>
  )
}

export default AppRoutes
