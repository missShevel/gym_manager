import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import InputLabel from './component';

const TEXT = 'Text';

describe('InputLabel component:', () => {
  it('should render correctly', () => {
    render(<InputLabel>{TEXT}</InputLabel>);

    const inputLabel = screen.getByText(TEXT);

    expect(inputLabel).toBeInTheDocument();
  });
});
