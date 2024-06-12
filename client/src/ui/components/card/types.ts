import { ElementType } from 'react';
import { CardProps as MuiCardProps } from '@mui/material/Card';

type CustomProps = {};

export type CardProps<Component extends ElementType> = MuiCardProps<
  Component,
  { component?: Component } & CustomProps
>;
