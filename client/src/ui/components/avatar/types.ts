import { ElementType } from 'react';
import { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';

type CustomProps = {};

export type AvatarProps<Component extends ElementType> = MuiAvatarProps<
  Component,
  { component?: Component } & CustomProps
>;
