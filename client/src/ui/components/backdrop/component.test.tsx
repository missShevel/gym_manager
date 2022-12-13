import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import Backdrop from './component';

const TEXT = 'Text';

describe('Backdrop component:', () => {
  it('should render correctly', () => {
    render(<Backdrop open>{TEXT}</Backdrop>);

    const backdrop = screen.getByText(TEXT);

    expect(backdrop).toBeInTheDocument();
  });
});
