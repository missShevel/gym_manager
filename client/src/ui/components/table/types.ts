import { ElementType } from 'react';
import { TableProps as MuiTableProps } from '@mui/material/Table';

type CustomProps = {};

export type TableProps<Component extends ElementType> = MuiTableProps<
  Component,
  { component?: Component } & CustomProps
>;
