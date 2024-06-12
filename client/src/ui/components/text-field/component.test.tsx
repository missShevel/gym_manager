import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import TextField from './component';

describe('TextField component:', () => {
  it('should render correctly', () => {
    render(<TextField />);

    const textField = screen.getByRole('textbox');

    expect(textField).toBeInTheDocument();
  });
});
