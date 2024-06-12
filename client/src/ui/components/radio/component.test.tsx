import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import Radio from './component';

describe('Radio component:', () => {
  it('should render correctly', () => {
    render(<Radio />);

    const radio = screen.getByRole('radio');

    expect(radio).toBeInTheDocument();
  });
});
