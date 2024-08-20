import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CategoryProduct from '../../src/routes/_components/CategoryProductsPreview';
import { getCategoryProducts } from '../../src/routes/_lib/store';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../../src/routes/_lib/store', () => ({
  getCategoryProducts: vi.fn(
    () =>
      new Promise((resolve) =>
        resolve([
          {
            id: 1,
            title: 'First',
            image: 'first.png'
          },
          {
            id: 2,
            title: 'Second',
            image: 'second.png'
          }
        ])
      )
  )
}));

vi.mock('../../src/routes/_components/Product', () => ({
  default: ({ image, title }) => (
    <>
      <div data-testid="test-title">{title}</div>
      <div data-testid="test-image">{image}</div>
    </>
  )
}));

describe('it renders category products', () => {
  it('calls function one time to get products', async () => {
    render(
      <BrowserRouter>
        <CategoryProduct category={'Test'} />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(getCategoryProducts).toHaveBeenCalledWith('test', 4);
      expect(getCategoryProducts).toHaveBeenCalledOnce();
    });
  });

  it('renders category name as heading', async () => {
    render(
      <BrowserRouter>
        <CategoryProduct category={'Test'} />
      </BrowserRouter>
    );

    expect(await screen.findByRole('heading')).toHaveTextContent('Test');
  });

  it('links to that category (lowercase) with Browse More text', async () => {
    render(
      <BrowserRouter>
        <CategoryProduct category={'Test'} />
      </BrowserRouter>
    );

    expect(await screen.findByRole('link')).toHaveAttribute(
      'href',
      '/store?category=test'
    );
  });

  it('renders products', async () => {
    render(
      <BrowserRouter>
        <CategoryProduct category={'Test'} />
      </BrowserRouter>
    );

    const titles = await screen.findAllByTestId('test-title');
    const images = await screen.findAllByTestId('test-image');

    expect(titles).toHaveLength(2);
    expect(titles[0]).toHaveTextContent('First');
    expect(titles[1]).toHaveTextContent('Second');

    expect(images).toHaveLength(2);
    expect(images[0]).toHaveTextContent('first.png');
    expect(images[1]).toHaveTextContent('second.png');
  });
});
