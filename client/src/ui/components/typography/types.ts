import { ElementType } from 'react';
import { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';

type CustomProps = {};

export type TypographyProps<Component extends ElementType> = MuiTypographyProps<
  Component,
  { component?: Component } & CustomProps
>;
