import { FormControlProps } from '@mui/material';
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

type CustomProps = {};

export type TextFieldProps = MuiTextFieldProps & FormControlProps & CustomProps;
