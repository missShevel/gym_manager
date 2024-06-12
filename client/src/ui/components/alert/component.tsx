import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import MuiAlert from '@mui/material/Alert';

import { AlertProps } from './types';

const StyledAlert = styled(MuiAlert)``;

export default function Alert<Component extends ElementType = 'div'>(props: AlertProps<Component>) {
  return <StyledAlert {...props} />;
}
