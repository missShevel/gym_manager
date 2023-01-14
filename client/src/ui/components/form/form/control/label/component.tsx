import { styled } from '@mui/material/styles';
import MuiFormControlLabel from '@mui/material/FormControlLabel';

import { FormControlLabelProps } from './types';

const StyledFormControlLabel = styled(MuiFormControlLabel)``;

export default function FormControlLabel(props: FormControlLabelProps) {
  return <StyledFormControlLabel {...props} />;
}
