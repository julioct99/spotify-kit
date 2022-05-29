import { styled } from '@mui/system'

const StyledDiv = styled('div')`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

interface AlignCenterDivProps {
  children: JSX.Element | JSX.Element[]
  style?: React.CSSProperties
  props?: any
}

const AlignCenterDiv: React.FunctionComponent<AlignCenterDivProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <StyledDiv style={style} {...props}>
      {children}
    </StyledDiv>
  )
}

export default AlignCenterDiv
