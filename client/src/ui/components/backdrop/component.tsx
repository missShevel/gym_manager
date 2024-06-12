import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import MuiBackdrop from '@mui/material/Backdrop';

import { BackdropProps } from './types';

const StyledBackdrop = styled(MuiBackdrop)``;

export default function Backdrop<Component extends ElementType>(props: BackdropProps<Component>) {
  return <StyledBackdrop {...props} />;
}
