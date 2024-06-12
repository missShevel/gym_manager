import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import MuiMenuItem from '@mui/material/MenuItem';

import { MenuItemProps } from './types';

const StyledMenuItem = styled(MuiMenuItem)``;

export default function MenuItem<Component extends ElementType>(props: MenuItemProps<Component>) {
  return <StyledMenuItem {...props} />;
}
