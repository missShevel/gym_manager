import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';

import { ButtonProps } from './types';

const StyledButton = styled(MuiButton)``;

export default function Button<Component extends ElementType = 'button'>(
  props: ButtonProps<Component>,
) {
  return <StyledButton {...props} />;
}
