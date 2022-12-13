import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import Stepper from './component';

const TEXT = 'Text';

describe('Stepper component:', () => {
  it('should render correctly', () => {
    render(
      <Stepper>
        <p>{TEXT}</p>
      </Stepper>,
    );

    const stepper = screen.getByText(TEXT);

    expect(stepper).toBeInTheDocument();
  });
});
