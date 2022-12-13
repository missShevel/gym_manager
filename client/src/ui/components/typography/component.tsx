import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import MuiTypography from '@mui/material/Typography';

import { TypographyProps } from './types';

const StyledTypography = styled(MuiTypography)``;

export default function Typography<Component extends ElementType = 'span'>(
  props: TypographyProps<Component>,
) {
  return <StyledTypography {...props} />;
}
