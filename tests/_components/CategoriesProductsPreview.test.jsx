import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CategoryProduct from '../../src/routes/_components/CategoryProductsPreview';
import { getCategoryProducts } from '../../src/routes/_lib/products';

vi.mock('react-router-dom', () => ({
  Link: ({ to, ...props }) => <a href={to} {...props}></a>
}));

vi.mock('../../src/routes/_lib/products', () => ({
  getCategoryProducts: vi.fn(
    (category, limit) =>
      new Promise((resolve) =>
        resolve([
          {
            id: 1,
            title: 'First',
            img: 'first.png'
          },
          {
            id: 2,
            title: 'Second',
            img: 'second.png'
          }
        ])
      )
  )
}));

vi.mock('./Product', ({ image, title }) => (
  <>
    <div data-testid="test-title">{title}</div>
    <div data-testid="test-image">{image}</div>
  </>
));

describe('it renders category products', () => {
  it('renders category name as heading', () => {
    render(<CategoryProduct category={'Test'} />);

    expect(screen.getByRole('heading')).toHaveTextContent('Test');
  });

  it('links to that category (lowercase) with Browse More text', () => {
    render(<CategoryProduct category={'Test'} />);

    expect(screen.getByRole('link')).toHaveAttribute('href', 'test');
  });

  it('renders calls function to get products', () => {
    render(<CategoryProduct category={'Test'} />);

    expect(getCategoryProducts).toHaveBeenCalledWith('test', 4);
  });

  // it('renders calls function to get products', async () => {
  //   vi.useFakeTimers();
  //   act(() => {
  //     render(<CategoryProduct category={'Test'} />);
  //   });
  //   act(() => {
  //     vi.runAllTimers();
  //   });
  //   const titles = screen.getAllByTestId('test-title');
  //   const images = screen.getAllByTestId('test-image');
  //   expect(titles).toHaveLength(2);
  //   expect(titles[0]).toHaveTextContent('First');
  //   expect(titles[1]).toHaveTextContent('Second');
  // });
});
