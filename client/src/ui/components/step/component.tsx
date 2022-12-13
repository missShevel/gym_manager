import { styled } from '@mui/material/styles';
import MuiStep from '@mui/material/Step';

import { StepProps } from './types';

const StyledStep = styled(MuiStep)``;

export default function Step(props: StepProps) {
  return <StyledStep {...props} />;
}
