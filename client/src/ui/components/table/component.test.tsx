import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import Table from './component';

describe('Table component:', () => {
  it('should render correctly', () => {
    render(<Table />);

    const table = screen.getByRole('table');

    expect(table).toBeInTheDocument();
  });
});
