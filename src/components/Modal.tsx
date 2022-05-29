import { Fade, ModalUnstyledProps, styled } from '@mui/material'
import { ModalUnstyled } from '@mui/base'

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`

const Modal: React.FunctionComponent<ModalUnstyledProps> = ({
  children,
  open,
  ...props
}) => {
  return (
    <StyledModal open={open} BackdropComponent={Backdrop} {...props}>
      <Fade timeout={200} in={open}>
        <div>{children}</div>
      </Fade>
    </StyledModal>
  )
}

export default Modal
