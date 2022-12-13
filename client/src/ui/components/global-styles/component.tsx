import MuiGlobalStyles from '@mui/material/GlobalStyles';

import { GlobalStylesProps } from './types';

export default function GlobalStyles(props: GlobalStylesProps) {
  return <MuiGlobalStyles {...props} />;
}
