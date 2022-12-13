import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import MuiStack from '@mui/material/Stack';

import { StackProps } from './types';

const StyledStack = styled(MuiStack)``;

export default function Stack<Component extends ElementType = 'div'>(props: StackProps<Component>) {
  return <StyledStack {...props} />;
}
