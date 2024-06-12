import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import Paper from './component';

const TEXT = 'Text';

describe('Paper component:', () => {
  it('should render correctly', () => {
    render(
      <Paper>
        <p>{TEXT}</p>
      </Paper>,
    );

    const paper = screen.getByText(TEXT);

    expect(paper).toBeInTheDocument();
  });
});
