import { styled } from '@mui/material/styles';
import MuiTextField from '@mui/material/TextField';

import type { TextFieldProps } from './types';

const StyledTextField = styled(MuiTextField)``;

export default function TextField(props: TextFieldProps) {
  return <StyledTextField {...props} />;
}
