import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Cover from '../../src/routes/_components/Cover';

describe('Cover page renders correctly', () => {
  it('renders text', () => {
    render(<Cover />);

    expect(screen.getByTestId('main-cover')).toHaveTextContent(
      /find your own style/i
    );
  });
});
