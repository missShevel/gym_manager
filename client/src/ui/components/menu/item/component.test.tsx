import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import MenuItem from './component';

const TEXT = 'Text';

describe('MenuItem component:', () => {
  it('should render correctly', () => {
    render(<MenuItem>{TEXT}</MenuItem>);

    const menuItem = screen.getByText(TEXT);

    expect(menuItem).toBeInTheDocument();
  });
});
