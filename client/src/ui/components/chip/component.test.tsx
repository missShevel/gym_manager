import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import Chip from './component';

const LABEL = 'Chip';

describe('Chip component:', () => {
  it('should render correctly', () => {
    render(<Chip label={LABEL} />);

    const chip = screen.getByText(LABEL);

    expect(chip).toBeInTheDocument();
  });
});
