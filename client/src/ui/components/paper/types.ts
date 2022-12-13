import { ElementType } from 'react';
import { PaperProps as MuiPaperProps } from '@mui/material/Paper';

type CustomProps = {};

export type PaperProps<Component extends ElementType> = MuiPaperProps<
  Component,
  { component?: Component } & CustomProps
>;
