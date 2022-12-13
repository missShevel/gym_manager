import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import Card from './component';

const TEXT = 'Text';

describe('Card component:', () => {
  it('should render correctly', () => {
    render(
      <Card>
        <p>{TEXT}</p>
      </Card>,
    );

    const card = screen.getByText(TEXT);

    expect(card).toBeInTheDocument();
  });
});
