import { ElementType } from 'react';
import { SkeletonProps as MuiSkeletonProps } from '@mui/material/Skeleton';

type CustomProps = {};

export type SkeletonProps<Component extends ElementType> = MuiSkeletonProps<
  Component,
  { component?: Component } & CustomProps
>;
