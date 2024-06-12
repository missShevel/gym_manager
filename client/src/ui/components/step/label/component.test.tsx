import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import StepLabel from './component';

const TEXT = 'Text';

describe('StepLabel component:', () => {
  it('should render correctly', () => {
    render(<StepLabel>{TEXT}</StepLabel>);

    const stepLabel = screen.getByText(TEXT);

    expect(stepLabel).toBeInTheDocument();
  });
});
