import { styled } from '@mui/material/styles';
import MuiRating from '@mui/material/Rating';

import { RatingProps } from './types';

const StyledRating = styled(MuiRating)``;

export default function Rating(props: RatingProps) {
  return <StyledRating {...props} />;
}
