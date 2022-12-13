import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import Container from './component';

const TEXT = 'TEXT';

describe('Container component:', () => {
  it('should render correctly', () => {
    render(<Container>{TEXT}</Container>);

    const container = screen.getByText(TEXT);

    expect(container).toBeInTheDocument();
  });
});
