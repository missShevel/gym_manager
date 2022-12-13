import { styled } from '@mui/material/styles';
import MuiCircularProgress from '@mui/material/CircularProgress';

import { CircularProgressProps } from './types';

const StyledCircularProgress = styled(MuiCircularProgress)``;

export default function CircularProgress(props: CircularProgressProps) {
  return <StyledCircularProgress {...props} />;
}
