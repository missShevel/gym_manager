import { styled } from '@mui/material/styles';
import MuiStepLabel from '@mui/material/StepLabel';

import { StepLabelProps } from './types';

const StyledStepLabel = styled(MuiStepLabel)``;

export default function Step(props: StepLabelProps) {
  return <StyledStepLabel {...props} />;
}
