import { ElementType } from 'react';
import { MenuItemProps as MuiMenuItemProps } from '@mui/material/MenuItem';

type CustomProps = {};

export type MenuItemProps<Component extends ElementType> = MuiMenuItemProps<
  Component,
  { component?: Component } & CustomProps
>;
