import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';

import Select from './component';

describe('Select component:', () => {
  it('should render correctly', () => {
    render(
      <Select>
        <option>Option</option>
      </Select>,
    );

    const select = screen.getByRole('button');

    expect(select).toBeInTheDocument();
  });
});
