import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import List from './component';

describe('List component:', () => {
  it('should render correctly', () => {
    render(<List />);

    const list = screen.getByRole('list');

    expect(list).toBeInTheDocument();
  });
});
