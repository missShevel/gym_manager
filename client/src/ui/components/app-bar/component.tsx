import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';

import { AppBarProps } from './types';

const StyledAppBar = styled(MuiAppBar)``;

export default function AppBar<Component extends ElementType = 'div'>(
  props: AppBarProps<Component>,
) {
  return <StyledAppBar {...props} />;
}
