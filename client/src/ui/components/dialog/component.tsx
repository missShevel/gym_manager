import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import MuiDialog from '@mui/material/Dialog';

import { DialogProps } from './types';

const StyledDialog = styled(MuiDialog)``;

export default function Dialog<Component extends ElementType>(props: DialogProps<Component>) {
  return <StyledDialog {...props} />;
}
