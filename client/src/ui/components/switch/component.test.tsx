import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import Switch from './component';

describe('Switch component:', () => {
  it('should render correctly', () => {
    render(<Switch />);

    const switchComponent = screen.getByRole('checkbox');

    expect(switchComponent).toBeInTheDocument();
  });
});
