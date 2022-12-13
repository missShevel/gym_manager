import { styled } from '@mui/material/styles';
import MuiLinearProgress from '@mui/material/LinearProgress';

import { LinearProgressProps } from './types';

const StyledLinearProgress = styled(MuiLinearProgress)``;

export default function LinearProgress(props: LinearProgressProps) {
  return <StyledLinearProgress {...props} />;
}
