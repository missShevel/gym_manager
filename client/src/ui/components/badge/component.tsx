import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import MuiBadge from '@mui/material/Badge';

import { BadgeProps } from './types';

const StyledBadge = styled(MuiBadge)``;

export default function Badge<Component extends ElementType = 'span'>(
  props: BadgeProps<Component>,
) {
  return <StyledBadge {...props} />;
}
