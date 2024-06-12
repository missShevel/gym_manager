import { ElementType } from 'react';
import { ModalProps } from '@mui/material';
import { DialogProps as MuiDialogProps } from '@mui/material/Dialog';

type CustomProps = {};

export type DialogProps<Component extends ElementType> = MuiDialogProps &
  ModalProps<Component, { component?: Component } & CustomProps>;
