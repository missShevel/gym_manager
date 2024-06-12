import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import Skeleton from './component';

const TEST_ID = 'test-id';

describe('Skeleton component:', () => {
  it('should render correctly', () => {
    render(<Skeleton data-testid={TEST_ID} />);

    const skeleton = screen.getByTestId(TEST_ID);

    expect(skeleton).toBeInTheDocument();
  });
});
