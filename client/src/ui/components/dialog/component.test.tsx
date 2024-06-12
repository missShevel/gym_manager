import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import Dialog from './component';

const TEXT = 'Text';

describe('Dialog component:', () => {
  it('should render correctly', () => {
    render(
      <Dialog open>
        <p>{TEXT}</p>
      </Dialog>,
    );

    const dialog = screen.getByText(TEXT);

    expect(dialog).toBeInTheDocument();
  });
});
