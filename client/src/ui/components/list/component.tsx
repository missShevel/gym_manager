import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import MuiList from '@mui/material/List';

import { ListProps } from './types';

const StyledList = styled(MuiList)``;

export default function List<Component extends ElementType = 'ul'>(props: ListProps<Component>) {
  return <StyledList {...props} />;
}
