import { styled } from '@mui/material/styles';
import MuiStepper from '@mui/material/Stepper';

import { StepperProps } from './types';

const StyledStepper = styled(MuiStepper)``;

export default function Stepper(props: StepperProps) {
  return <StyledStepper {...props} />;
}
