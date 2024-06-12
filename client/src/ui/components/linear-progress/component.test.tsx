import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import LinearProgress from './component';

describe('LinearProgress component:', () => {
  it('should render correctly', () => {
    render(<LinearProgress />);

    const linearProgress = screen.getByRole('progressbar');

    expect(linearProgress).toBeInTheDocument();
  });
});
