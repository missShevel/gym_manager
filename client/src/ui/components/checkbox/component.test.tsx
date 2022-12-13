import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import Checkbox from './component';

describe('Checkbox component:', () => {
  it('should render correctly', () => {
    render(<Checkbox />);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeInTheDocument();
  });
});
