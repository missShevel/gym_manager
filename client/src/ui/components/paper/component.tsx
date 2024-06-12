import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import MuiPaper from '@mui/material/Paper';

import { PaperProps } from './types';

const StyledPaper = styled(MuiPaper)``;

export default function Paper<Component extends ElementType = 'div'>(props: PaperProps<Component>) {
  return <StyledPaper {...props} />;
}
