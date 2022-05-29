import { IconButton, styled, useTheme } from '@mui/material';

import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const StyledDrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface DrawerHeaderProps {
  onDrawerClose: () => void;
}

const DrawerHeader: React.FunctionComponent<DrawerHeaderProps> = ({ onDrawerClose }) => {
  const theme = useTheme();

  return (
    <StyledDrawerHeader>
      <IconButton onClick={onDrawerClose}>
        {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
      </IconButton>
    </StyledDrawerHeader>
  );
};

export default DrawerHeader;
