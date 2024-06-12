import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import ToggleButton from './component';

const DEFAULT_VALUE = 'value';

describe('ToggleButton component:', () => {
  it('should render correctly', () => {
    render(<ToggleButton value={DEFAULT_VALUE} />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });
});
