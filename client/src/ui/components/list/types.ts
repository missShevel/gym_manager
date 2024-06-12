import { ElementType } from 'react';
import { ListProps as MuiListProps } from '@mui/material/List';

type CustomProps = {};

export type ListProps<Component extends ElementType> = MuiListProps<
  Component,
  { component?: Component } & CustomProps
>;
