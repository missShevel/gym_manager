import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

import { BoxProps } from './types';

const StyledBox = styled(MuiBox)``;

export default function Box<Component extends ElementType = 'div'>(props: BoxProps<Component>) {
  return <StyledBox {...props} />;
}
