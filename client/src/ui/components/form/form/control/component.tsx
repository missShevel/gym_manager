import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import MuiFormControl from '@mui/material/FormControl';

import { FormControlProps } from './types';

const StyledFormControl = styled(MuiFormControl)``;

export default function FormControl<Component extends ElementType = 'div'>(
  props: FormControlProps<Component>,
) {
  return <StyledFormControl {...props} />;
}
