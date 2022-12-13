import { ElementType } from 'react';
import { BoxProps as MuiBoxProps } from '@mui/material/Box';

type CustomProps = {};

export type BoxProps<Component extends ElementType> = MuiBoxProps<
  Component,
  { component?: Component } & CustomProps
>;
