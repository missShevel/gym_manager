import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import MuiDivider from '@mui/material/Divider';

import { DividerProps } from './types';

const StyledChip = styled(MuiDivider)``;

export default function Divider<Component extends ElementType = 'hr'>(
  props: DividerProps<Component>,
) {
  return <StyledChip {...props} />;
}
