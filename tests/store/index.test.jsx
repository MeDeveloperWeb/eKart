import { describe, expect, it, vi } from 'vitest';
import { getProducts } from '../../src/routes/_lib/storeUtil';
import { render, screen } from '@testing-library/react';
import Store from '../../src/routes/store';
import userEvent from '@testing-library/user-event';

vi.mock('../../src/routes/store/_components/Header', () => ({
  default: ({ filter, applyFilter }) => (
    <div data-testid="header">
      {Object.entries(filter).map(([key, value]) => (
        <div key={key} data-testid={key}>
          {value}
        </div>
      ))}
      <button
        data-testid="filter-change"
        onClick={() => applyFilter({ search: 'new-test-search' })}
      >
        Change Filter
      </button>
    </div>
  )
}));

vi.mock('../../src/routes/_lib/storeUtil', () => ({
  getProducts: vi.fn(
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

const initialFilter = {
  search: 'test-search',
  category: 'test-category',
  sort: 'desc'
};

const initialSearchParams = {
  q: 'test-search',
  category: 'test-category',
  sort: 'desc'
};

const setSearchParamMock = vi.fn();

vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn(() => {
    let search = new URLSearchParams(initialSearchParams);

    const setSearch = setSearchParamMock;
    return [search, setSearch];
  })
}));

describe('Store Page Header', () => {
  it('should render the header', () => {
    render(<Store />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('should provide correct filter to header', () => {
    render(<Store />);

    for (const i in initialFilter) {
      expect(screen.getByTestId(i)).toHaveTextContent(initialFilter[i]);
    }
  });

  it('should apply filter correctly', async () => {
    render(<Store />);

    const btn = screen.getByTestId('filter-change');

    const user = userEvent.setup();

    await user.click(btn);

    expect(screen.getByTestId('search')).toHaveTextContent('new-test-search');
  });

  it('should change url params on filter change', async () => {
    render(<Store />);

    const btn = screen.getByTestId('filter-change');

    const user = userEvent.setup();

    await user.click(btn);

    expect(setSearchParamMock).toHaveBeenLastCalledWith({
      ...initialSearchParams,
      q: 'new-test-search'
    });
  });
});

describe('Store Page Products Fetching', () => {
  it('should fetch products with filter', () => {
    render(<Store />);

    expect(getProducts).toHaveBeenLastCalledWith(initialFilter);
  });

  it('should re-fetch products on filter change', async () => {
    render(<Store />);
    const btn = screen.getByTestId('filter-change');

    const user = userEvent.setup();

    await user.click(btn);

    expect(getProducts).toHaveBeenLastCalledWith({
      ...initialFilter,
      search: 'new-test-search'
    });
  });

  it('should not re-fetch unless required', async () => {
    render(<Store />);

    expect(getProducts).toHaveBeenCalledOnce();

    const user = userEvent.setup();

    const btn = screen.getByTestId('filter-change');

    await user.click(btn);

    expect(getProducts).toHaveBeenCalledTimes(2);
  });
});

describe('Store Page Products Listing', () => {
  it('should list all products', async () => {
    render(<Store />);

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
