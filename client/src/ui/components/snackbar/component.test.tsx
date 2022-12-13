import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import Snackbar from './component';

const MESSAGE = 'Message';

describe('Snackbar component:', () => {
  it('should render correctly', () => {
    render(<Snackbar message={MESSAGE} open />);

    const snackbar = screen.getByText(MESSAGE);

    expect(snackbar).toBeInTheDocument();
  });
});
