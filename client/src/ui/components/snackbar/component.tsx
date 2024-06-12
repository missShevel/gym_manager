import { styled } from '@mui/material/styles';
import MuiSnackbar from '@mui/material/Snackbar';

import { SnackbarProps } from './types';

const StyledSnackbar = styled(MuiSnackbar)``;

export default function Snackbar(props: SnackbarProps) {
  return <StyledSnackbar {...props} />;
}
