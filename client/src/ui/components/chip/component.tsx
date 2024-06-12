import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import MuiChip from '@mui/material/Chip';

import { ChipProps } from './types';

const StyledChip = styled(MuiChip)``;

export default function Chip<Component extends ElementType = 'div'>(props: ChipProps<Component>) {
  return <StyledChip {...props} />;
}
