import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import Form from './component';

describe('Form component:', () => {
  it('should render correctly', () => {
    render(<Form />);

    const form = screen.getByRole('form');

    expect(form).toBeInTheDocument();
  });
});
