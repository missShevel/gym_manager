import { ElementType } from 'react';
import { ButtonBaseProps } from '@mui/material';
import { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';

type CustomProps = {};

export type CheckboxProps<Component extends ElementType> = MuiCheckboxProps &
  ButtonBaseProps<Component, { component?: Component } & CustomProps>;
