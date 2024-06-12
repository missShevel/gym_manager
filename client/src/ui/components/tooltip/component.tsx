import { styled } from '@mui/material/styles';
import MuiTooltip from '@mui/material/Tooltip';

import { TooltipProps } from './types';

const StyledTooltip = styled(MuiTooltip)``;

export default function Tooltip(props: TooltipProps) {
  return <StyledTooltip {...props} />;
}
