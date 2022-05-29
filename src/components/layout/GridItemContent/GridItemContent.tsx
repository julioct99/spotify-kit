import { Card, styled } from '@mui/material'

export const GridItemContent = styled(Card)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
}))
