import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import FormControlLabel from './component';

const LABEL = 'label';
function CONTROL() {
  return <input />;
}

describe('FormControlLabel component:', () => {
  it('should render correctly', () => {
    render(<FormControlLabel label={LABEL} control={<CONTROL />} />);

    const formControlLabel = screen.getByLabelText(LABEL);

    expect(formControlLabel).toBeInTheDocument();
  });
});
