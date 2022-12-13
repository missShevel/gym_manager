import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import Badge from './component';

const BADGE_CONTENT = '1';

describe('Badge component:', () => {
  it('should render correctly', () => {
    render(<Badge badgeContent={BADGE_CONTENT} />);

    const badge = screen.getByText(BADGE_CONTENT);

    expect(badge).toBeInTheDocument();
  });
});
