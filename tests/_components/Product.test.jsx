import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Product from '../../src/routes/_components/Product';
import { BrowserRouter } from 'react-router-dom';

describe('Renders Product', () => {
  it('renders product image correctly', () => {
    render(
      <BrowserRouter>
        <Product image="img.png" title="title" />
      </BrowserRouter>
    );

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'img.png');
    expect(img).toHaveAttribute('alt', 'title');
  });

  it('renders product title correctly', () => {
    render(
      <BrowserRouter>
        <Product image="img.png" title="title" />
      </BrowserRouter>
    );

    expect(screen.getByRole('link')).toHaveTextContent('title');
  });

  it('links to product page', () => {
    render(
      <BrowserRouter>
        <Product image="img.png" title="title" id={3} />
      </BrowserRouter>
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', '/store/3');
  });
});
