import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import MuiToggleButton from '@mui/material/ToggleButton';

import { ToggleButtonProps } from './types';

const StyledToggleButton = styled(MuiToggleButton)``;

export default function ToggleButton<Component extends ElementType>(
  props: ToggleButtonProps<Component>,
) {
  return <StyledToggleButton {...props} />;
}
