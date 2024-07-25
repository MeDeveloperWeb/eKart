import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import ErrorPage from '../src/routes/ErrorPage';

describe('renders error page', () => {
  beforeEach(() => {
    render(<ErrorPage />);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders error heading', () => {
    expect(screen.getByRole('heading')).toHaveTextContent('404');
  });

  it('renders error text', () => {
    expect(screen.getByTestId('error-text')).toHaveTextContent(
      'Page not found'
    );
  });
});
