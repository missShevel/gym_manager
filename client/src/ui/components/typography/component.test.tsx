import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import Typography from './component';

const TEXT = 'Text';

describe('Typography component:', () => {
  it('should render correctly', () => {
    render(<Typography>{TEXT}</Typography>);

    const typography = screen.getByText(TEXT);

    expect(typography).toBeInTheDocument();
  });
});
