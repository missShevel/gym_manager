import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import FormControl from './component';

const TEST_ID = 'test-id';

describe('FormControl component:', () => {
  it('should render correctly', () => {
    render(<FormControl data-testid={TEST_ID} />);

    const formControl = screen.getByTestId(TEST_ID);

    expect(formControl).toBeInTheDocument();
  });
});
