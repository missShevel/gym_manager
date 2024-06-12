import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import AppBar from './component';

describe('AppBar component:', () => {
  it('should render correctly', () => {
    render(<AppBar data-testid="test-id" />);

    const appBar = screen.getByTestId('test-id');

    expect(appBar).toBeInTheDocument();
  });
});
