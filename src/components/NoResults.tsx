import { SearchOff } from '@mui/icons-material'
import { Typography, useTheme } from '@mui/material'
import AlignCenterDiv from './layout/utils/AlignCenterDiv'

interface NoResultsProps {
  message?: string
}

const NoResults: React.FunctionComponent<NoResultsProps> = ({ message }) => {
  const theme = useTheme()

  const defaultMessage = 'No results found'
  const displayMessage = message || defaultMessage

  return (
    <AlignCenterDiv style={{ margin: theme.spacing(2) }}>
      <SearchOff />
      <Typography marginLeft={2} display='inline' variant='body1'>
        {displayMessage}
      </Typography>
    </AlignCenterDiv>
  )
}

export default NoResults
