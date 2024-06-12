import { ElementType } from 'react';
import { ButtonBaseProps } from '@mui/material';
import { ToggleButtonProps as MuiToggleButtonProps } from '@mui/material/ToggleButton';

type CustomProps = {};

export type ToggleButtonProps<Component extends ElementType> = MuiToggleButtonProps<Component> &
  ButtonBaseProps<Component, { component?: Component } & CustomProps>;
