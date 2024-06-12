import { ElementType } from 'react';
import { ButtonBaseProps } from '@mui/material';
import { RadioProps as MuiRadioProps } from '@mui/material/Radio';

type CustomProps = {};

export type RadioProps<Component extends ElementType> = MuiRadioProps &
  ButtonBaseProps<Component, { component?: Component } & CustomProps>;
