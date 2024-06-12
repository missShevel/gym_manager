import { ElementType } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BadgeUnstyledProps } from '@mui/base';
import { BadgeProps as MuiBadgeProps } from '@mui/material/Badge';

type CustomProps = {};

export type BadgeProps<Component extends ElementType> = MuiBadgeProps<
  Component,
  { component?: Component } & CustomProps
> &
  BadgeUnstyledProps<Component>;
