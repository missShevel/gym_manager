import { ElementType } from 'react';
import { ChipProps as MuiChipProps } from '@mui/material/Chip';

type CustomProps = {};

export type ChipProps<Component extends ElementType> = MuiChipProps<
  Component,
  { component?: Component } & CustomProps
>;
