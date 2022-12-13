import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import Tooltip from './component';

const TITLE = 'Title';

describe('Tooltip component:', () => {
  it('should render correctly', () => {
    render(
      <Tooltip title={TITLE}>
        <p>Text</p>
      </Tooltip>,
    );

    const tooltip = screen.getByLabelText(TITLE);

    expect(tooltip).toBeInTheDocument();
  });
});
