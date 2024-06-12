import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import Step from './component';

const TEXT = 'Text';

describe('Step component:', () => {
  it('should render correctly', () => {
    render(
      <Step>
        <p>{TEXT}</p>
      </Step>,
    );

    const step = screen.getByText(TEXT);

    expect(step).toBeInTheDocument();
  });
});
