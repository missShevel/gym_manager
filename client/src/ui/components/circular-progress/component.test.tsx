import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import CircularProgress from './component';

describe('CircularProgress component:', () => {
  it('should render correctly', () => {
    render(<CircularProgress />);

    const circularProgress = screen.getByRole('progressbar');

    expect(circularProgress).toBeInTheDocument();
  });
});
