import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import MuiAvatar from '@mui/material/Avatar';

import { AvatarProps } from './types';

const StyledAvatar = styled(MuiAvatar)``;

export default function Avatar<Component extends ElementType = 'div'>(
  props: AvatarProps<Component>,
) {
  return <StyledAvatar {...props} />;
}
