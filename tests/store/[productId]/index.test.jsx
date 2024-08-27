import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ProductDescription from '../../../src/routes/store/[productId]';
import { getProductDetails } from '../../../src/routes/_lib/store';

vi.mock('react-router-dom', () => ({
  useParams: () => ({
    productId: 1
  })
}));

vi.mock('../../../src/routes/_lib/store', () => ({
  getProductDetails: vi.fn(
    (productId) =>
      new Promise((resolve) =>
        resolve({
          id: productId,
          title: 'Test Title',
          price: 100,
          description: 'Test Details',
          category: 'Test Category',
          image: 'https://test-img.com/',
          rating: {
            rate: 4.1,
            count: 100
          }
        })
      )
  )
}));

describe('Renders Product Description', () => {
  it('should render product title', () => {
    render(<ProductDescription />);

    expect(getProductDetails).toHaveBeenCalledOnce();
  });

  it('should render product title', () => {
    render(<ProductDescription />);

    waitFor(() => {
      expect(screen.getByRole('heading')).toHaveTextContent('Test Title');
    });
  });

  it('should render product details', () => {
    render(<ProductDescription />);

    waitFor(() => {
      expect(screen.getByText('Test Details')).toBeInTheDocument();
    });
  });

  it('should render product price', () => {
    render(<ProductDescription />);

    waitFor(() => {
      expect(screen.getByText('Rs.100')).toBeInTheDocument();
    });
  });

  it('should render inflated product price', () => {
    render(<ProductDescription />);

    waitFor(() => {
      expect(screen.getByText('Rs.110')).toBeInTheDocument();
    });
  });

  it('should render the product image', () => {
    render(<ProductDescription />);

    waitFor(() => {
      expect(screen.getByRole('img')).toHaveAttribute(
        'src',
        'https://test-img.com/'
      );
    });
  });

  it('should render the product rating', () => {
    render(<ProductDescription />);

    waitFor(() => {
      expect(screen.getByText('4.1 / 5.0 (259 ratings)')).toBeInTheDocument();
    });
  });

  it('should render add to cart button', () => {
    render(<ProductDescription />);

    waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent('Add to Cart');
    });
  });
});
