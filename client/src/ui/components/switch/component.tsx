import { styled } from '@mui/material/styles';
import MuiSwitch from '@mui/material/Switch';

import type { SwitchProps } from './types';

const StyledSwitch = styled(MuiSwitch)``;

export default function Switch(props: SwitchProps) {
  return <StyledSwitch {...props} />;
}
