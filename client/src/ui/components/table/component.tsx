import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import MuiTable from '@mui/material/Table';

import { TableProps } from './types';

const StyledTable = styled(MuiTable)``;

export default function Table<Component extends ElementType = 'table'>(
  props: TableProps<Component>,
) {
  return <StyledTable {...props} />;
}
