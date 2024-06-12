import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';

import { AccordionProps } from './types';

const StyledAccordion = styled(MuiAccordion)``;

export default function Accordion(props: AccordionProps) {
  return <StyledAccordion {...props} />;
}
