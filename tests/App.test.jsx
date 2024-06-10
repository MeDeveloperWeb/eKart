import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('App renders', () => {
  it('renders headline', () => {
    render(<App />);

    expect(screen.getByRole('heading').textContent).toMatch(/This is E-kart/i);

    // check if App components renders headline
  });
});
