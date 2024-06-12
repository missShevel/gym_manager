import { ElementType } from 'react';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

type CustomProps = {};

export type AppBarProps<Component extends ElementType> = MuiAppBarProps<
  Component,
  { component?: Component } & CustomProps
>;
