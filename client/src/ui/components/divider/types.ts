import { ElementType } from 'react';
import { DividerProps as MuiDividerProps } from '@mui/material/Divider';

type CustomProps = {};

export type DividerProps<Component extends ElementType> = MuiDividerProps<
  Component,
  { component?: Component } & CustomProps
>;
