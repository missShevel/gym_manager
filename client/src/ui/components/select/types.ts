import { OutlinedInputProps } from '@mui/material';
import { SelectProps as MuiSelectProps } from '@mui/material/Select';

type CustomProps = {};

export type SelectProps = MuiSelectProps & OutlinedInputProps & CustomProps;
