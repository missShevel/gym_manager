import { ElementType } from 'react';
import { BackdropProps as MuiBackdropProps } from '@mui/material/Backdrop';

type CustomProps = {};

export type BackdropProps<Component extends ElementType> = MuiBackdropProps<
  Component,
  { component?: Component } & CustomProps
>;
