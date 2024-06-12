import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import Box from './component';

const TEXT = 'Text';

describe('Box component:', () => {
  it('should render correctly', () => {
    render(
      <Box>
        <p>{TEXT}</p>
      </Box>,
    );

    const box = screen.getByText(TEXT);

    expect(box).toBeInTheDocument();
  });
});
