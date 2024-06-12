import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import MuiRadio from '@mui/material/Radio';

import { RadioProps } from './types';

const StyledRadio = styled(MuiRadio)``;

export default function Radio<Component extends ElementType>(props: RadioProps<Component>) {
  return <StyledRadio {...props} />;
}
