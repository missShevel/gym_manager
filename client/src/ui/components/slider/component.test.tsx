import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import Slider from './component';

describe('Slider component:', () => {
  it('should render correctly', () => {
    render(<Slider />);

    const slider = screen.getByRole('slider');

    expect(slider).toBeInTheDocument();
  });
});
