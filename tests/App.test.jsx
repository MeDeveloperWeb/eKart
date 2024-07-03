import { render, screen } from '@testing-library/react';
import App from '../src/App';
import { describe, expect, it } from 'vitest';

describe('App renders', () => {
  it('renders headline', () => {
    render(<App />);

    expect(screen.getByRole('heading').textContent).toMatch(/This is E-kart/i);

    // check if App components renders headline
  });
});
