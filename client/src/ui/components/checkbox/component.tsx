import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import MuiCheckbox from '@mui/material/Checkbox';

import { CheckboxProps } from './types';

const StyledCheckbox = styled(MuiCheckbox)``;

export default function Checkbox<Component extends ElementType>(props: CheckboxProps<Component>) {
  return <StyledCheckbox {...props} />;
}
