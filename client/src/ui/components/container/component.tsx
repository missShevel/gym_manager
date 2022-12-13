import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import MuiContainer from '@mui/material/Container';

import { ContainerProps } from './types';

const StyledContainer = styled(MuiContainer)``;

export default function Container<Component extends ElementType = 'div'>(
  props: ContainerProps<Component>,
) {
  return <StyledContainer {...props} />;
}
