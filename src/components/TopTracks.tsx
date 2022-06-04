import React from 'react'
import { Queries } from '../shared/api/queries'

import AudioPlayer from './AudioPlayer'

interface TopTracksProps {}

const TopTracks: React.FunctionComponent<TopTracksProps> = () => {
  const topTracks = Queries.users.useCurrentUserTopTracks()

  return (
    <>
      {topTracks.data?.items.map((track, index) => (
        <AudioPlayer key={track.id} track={track} index={index + 1} />
      ))}
    </>
  )
}

export default TopTracks
