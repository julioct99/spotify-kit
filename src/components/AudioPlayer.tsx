import * as React from 'react'
import { useEffect, useRef, useState } from 'react'

import ReactHowler from 'react-howler'

import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { PlayArrow, Pause } from '@mui/icons-material'
import { Chip, LinearProgress } from '@mui/material'

interface AudioPlayerProps {
  track: SpotifyApi.TrackObjectFull
  index?: number
}

const AudioPlayer: React.FunctionComponent<AudioPlayerProps> = ({ track, index }) => {
  const [isTrackPlaying, setIsTrackPlaying] = useState(false)
  const [trackProgress, setTrackProgress] = useState(0)

  const playerRef = useRef<any>()

  const theme = useTheme()

  useEffect(() => {
    const timer = setInterval(() => {
      const newProgress = Math.ceil(
        (playerRef.current?.seek() / playerRef.current?.duration()) * 100
      )
      setTrackProgress(newProgress)
    }, 100)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const togglePlayPause = () => {
    setIsTrackPlaying((prevPlaying) => !prevPlaying)
  }

  const buttonSx = { height: 38, width: 38 }

  if (!track.name) return null

  return (
    <Card
      sx={{
        display: 'flex',
        marginBottom: theme.spacing(2),
        width: 'fit-content',
        maxWidth: '100%',
      }}
    >
      <ReactHowler
        ref={playerRef}
        src={[track.preview_url || '']}
        playing={isTrackPlaying}
        format='mp3'
        loop={false}
        onEnd={togglePlayPause}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ width: 400 }}>
          {index && (
            <Chip
              sx={{ marginBottom: theme.spacing(1) }}
              label={`# ${index}`}
              color='primary'
            />
          )}
          <Typography component='div' variant='h5'>
            {track.name}
          </Typography>

          <Typography variant='subtitle1' color='text.secondary' component='div'>
            {track.artists[0].name}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton onClick={togglePlayPause} aria-label='play/pause'>
            {isTrackPlaying ? <Pause sx={buttonSx} /> : <PlayArrow sx={buttonSx} />}
          </IconButton>
          <Box sx={{ width: '80%' }}>
            <LinearProgress variant='determinate' value={trackProgress} />
          </Box>
        </Box>
      </Box>
      {!!track.album.images[0]?.url && (
        <CardMedia
          component='img'
          sx={{ width: 200, boxShadow: '-1px 0px 50px 1px #aaaaaa' }}
          image={track.album.images[0]?.url}
          alt='Live from space album cover'
        />
      )}
    </Card>
  )
}

export default AudioPlayer
