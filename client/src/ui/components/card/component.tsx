import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';

import { CardProps } from './types';

const StyledCard = styled(MuiCard)``;

export default function Card<Component extends ElementType>(props: CardProps<Component>) {
  return <StyledCard {...props} />;
}
