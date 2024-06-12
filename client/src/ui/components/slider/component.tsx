import { styled } from '@mui/material/styles';
import MuiSlider from '@mui/material/Slider';

import type { SliderProps } from './types';

const StyledSlider = styled(MuiSlider)``;

export default function Slider(props: SliderProps) {
  return <StyledSlider {...props} />;
}
