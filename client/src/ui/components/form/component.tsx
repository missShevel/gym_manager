import { styled } from '@mui/material/styles';

import { FormProps } from './types';

const StyledForm = styled('form')``;

export default function Form(props: FormProps) {
  return <StyledForm role="form" {...props} />;
}
