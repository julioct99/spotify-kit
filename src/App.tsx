import { HomePage } from '@pages'
import { Layout } from '@components/layout'

export const BASE_SPOTIFY_API_URI = 'https://api.spotify.com/v1'
export const MY_TOP_TRACKS_ENDPOINT = `${BASE_SPOTIFY_API_URI}/me/top/tracks/?time_range=long_term`

export interface AuthObject {
  access_token: string
  token_type: string
  expires_in: string
}

function App() {
  return (
    <Layout>
      <HomePage />
    </Layout>
  )
}

export default App
