import TopTracks from '../components/TopTracks'

interface TopTracksPageProps {}

const TopTracksPage: React.FunctionComponent<TopTracksPageProps> = () => {
  return (
    <>
      <h1>Top tracks</h1>
      <TopTracks />
    </>
  )
}

export default TopTracksPage
