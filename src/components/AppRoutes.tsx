import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages'
import TopTracksPage from '../pages/TopTracksPage'

interface AppRoutesProps {}

const AppRoutes: React.FunctionComponent<AppRoutesProps> = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='top/tracks' element={<TopTracksPage />} />
    </Routes>
  )
}

export default AppRoutes
