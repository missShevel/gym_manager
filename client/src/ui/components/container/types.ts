import { ElementType } from 'react';
import { ContainerProps as MuiContainerProps } from '@mui/material/Container';

type CustomProps = {};

export type ContainerProps<Component extends ElementType> = MuiContainerProps<
  Component,
  { component?: Component } & CustomProps
>;
