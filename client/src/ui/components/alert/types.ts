import { ElementType } from 'react';
import { PaperProps } from '@mui/material';
import { AlertProps as MuiAlertProps } from '@mui/material/Alert';

type CustomProps = {};

export type AlertProps<Component extends ElementType> = MuiAlertProps &
  PaperProps<Component, { component?: Component } & CustomProps>;
