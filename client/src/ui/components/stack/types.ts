import { ElementType } from 'react';
import { StackProps as MuiStackProps } from '@mui/material/Stack';

type CustomProps = {};

export type StackProps<Component extends ElementType> = MuiStackProps<
  Component,
  { component?: Component } & CustomProps
>;
