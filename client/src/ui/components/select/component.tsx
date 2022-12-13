import { styled } from '@mui/material/styles';
import MuiSelect from '@mui/material/Select';

import { SelectProps } from './types';

const StyledSelect = styled(MuiSelect)``;

export default function Select(props: SelectProps) {
  return <StyledSelect {...props} />;
}
