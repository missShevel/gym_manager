import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import Button from './component';

describe('Button component:', () => {
  it('should render correctly', () => {
    render(<Button />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });
});
