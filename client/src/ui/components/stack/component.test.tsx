import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import Stack from './component';

const TEXT = 'Text';

describe('Stack component:', () => {
  it('should render correctly', () => {
    render(
      <Stack>
        <p>{TEXT}</p>
      </Stack>,
    );

    const stack = screen.getByText(TEXT);

    expect(stack).toBeInTheDocument();
  });
});
