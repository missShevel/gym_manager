import { styled } from '@mui/material/styles';
import MuiInputLabel from '@mui/material/InputLabel';

import { InputLabelProps } from './types';

const StyledInputLabel = styled(MuiInputLabel)``;

export default function InputLabel(props: InputLabelProps) {
  return <StyledInputLabel {...props} />;
}
