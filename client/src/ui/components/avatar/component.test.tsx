import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import Avatar from './component';

const ALT = 'John Snow';
const SRC = '/';

describe('Avatar component:', () => {
  it('should render correctly', () => {
    render(<Avatar alt={ALT} src={SRC} />);

    const avatar = screen.getByAltText(ALT);

    expect(avatar).toBeInTheDocument();
  });
});
