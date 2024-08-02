import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Product from '../../src/routes/_components/Product';

describe('Renders Product', () => {
  it('renders product image correctly', () => {
    render(<Product image="img.png" title="title" />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'img.png');
    expect(img).toHaveAttribute('alt', 'title');
  });

  it('renders product title correctly', () => {
    render(<Product image="img.png" title="title" />);

    expect(screen.getByText('title')).toBeInTheDocument();
  });
});
