import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import MuiSkeleton from '@mui/material/Skeleton';

import { SkeletonProps } from './types';

const StyledSkeleton = styled(MuiSkeleton)``;

export default function Skeleton<Component extends ElementType = 'span'>(
  props: SkeletonProps<Component>,
) {
  return <StyledSkeleton {...props} />;
}
