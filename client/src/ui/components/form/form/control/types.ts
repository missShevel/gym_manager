import { ElementType } from 'react';
import { FormControlProps as MuiFormControlProps } from '@mui/material/FormControl';

type CustomProps = {};

export type FormControlProps<Component extends ElementType> = MuiFormControlProps<
  Component,
  { component?: Component } & CustomProps
>;
