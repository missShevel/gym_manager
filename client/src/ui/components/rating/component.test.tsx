import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import Rating from './component';

const MAXIMUM_STARS = 5;

describe('Rating component:', () => {
  it('should render correctly', () => {
    render(<Rating max={MAXIMUM_STARS} />);

    const rating = screen.getAllByRole('radio');

    expect(rating).toHaveLength(MAXIMUM_STARS + 1); // + 1 because of possible zero rating
  });
});
