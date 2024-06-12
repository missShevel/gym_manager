import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import Divider from './component';

describe('Divider component:', () => {
  it('should render correctly', () => {
    render(<Divider />);

    const divider = screen.getByRole('separator');

    expect(divider).toBeInTheDocument();
  });
});
