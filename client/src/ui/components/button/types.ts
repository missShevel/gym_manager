import { ElementType } from 'react';
import { ButtonProps as MuiButtonProps } from '@mui/material/Button';

type CustomProps = {};

export type ButtonProps<Component extends ElementType> = MuiButtonProps<
  Component,
  { component?: Component } & CustomProps
>;
