import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import axios from 'axios'

import { getSpotifyToken } from './shared/utils/token'
import { Layout } from './components/layout'
import { HomePage } from './pages'

export const BASE_SPOTIFY_API_URI = 'https://api.spotify.com/v1'
export const MY_TOP_TRACKS_ENDPOINT = `${BASE_SPOTIFY_API_URI}/me/top/tracks/?time_range=long_term`

export interface AuthObject {
  access_token: string
  token_type: string
  expires_in: string
}

axios.defaults.headers.common['Authorization'] = getSpotifyToken()

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <HomePage />
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
