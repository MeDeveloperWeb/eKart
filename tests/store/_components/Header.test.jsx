import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Header from '../../../src/routes/store/_components/Header';
import userEvent from '@testing-library/user-event';
import { getCategories } from '../../../src/routes/_lib/store';

vi.mock('../../../src/routes/_lib/store', () => ({
  getCategories: vi.fn(
    () =>
      new Promise((resolve) => resolve(['test category 1', 'test category 2']))
  )
}));

const initialFilter = {
  search: 'test-search',
  category: 'test category 2',
  sort: 'descending'
};

describe('Search Bar', () => {
  it('should render search bar', () => {
    render(<Header filter={initialFilter} applyFilter={() => {}} />);

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('should render search button', () => {
    render(<Header filter={initialFilter} applyFilter={() => {}} />);

    expect(screen.getByTitle('Search Button')).toBeInTheDocument();
  });

  it('should change filter on search by clicking enter', async () => {
    const applyFilter = vi.fn();

    render(<Header filter={initialFilter} applyFilter={applyFilter} />);

    const user = userEvent.setup();

    const searchBox = screen.getByRole('searchbox');

    await user.type(searchBox, 'test{enter}');

    expect(applyFilter).toHaveBeenCalledOnce();
  });

  it('should change filter on search by clicking button', async () => {
    const applyFilter = vi.fn();

    render(<Header filter={initialFilter} applyFilter={applyFilter} />);

    const user = userEvent.setup();

    const searchBox = screen.getByRole('searchbox');

    const searchBtn = screen.getByTitle('Search Button');

    await user.type(searchBox, 'test');

    await user.click(searchBtn);

    expect(applyFilter).toHaveBeenCalledOnce();
  });

  it('search bar should be empty if no search text provided', () => {
    render(<Header filter={{}} applyFilter={() => {}} />);

    expect(screen.getByRole('searchbox')).toHaveValue('');
  });

  it('should auto fill search with provided text', () => {
    render(<Header filter={initialFilter} applyFilter={() => {}} />);

    expect(screen.getByRole('searchbox')).toHaveValue('test-search');
  });
});

describe('Category Selection', () => {
  it('should render category selection dropdown', () => {
    render(<Header filter={initialFilter} applyFilter={() => {}} />);

    expect(screen.getByTestId('category')).toBeInTheDocument();
  });

  it('should fetch Categories exactly once', () => {
    render(<Header filter={initialFilter} applyFilter={() => {}} />);

    expect(getCategories).toHaveBeenCalledOnce();
  });

  it('should list all categories', async () => {
    render(<Header filter={initialFilter} applyFilter={() => {}} />);

    const user = userEvent.setup();

    const categories = await screen.findByTestId('category');

    await user.selectOptions(categories, 'test category 1');

    await user.selectOptions(categories, 'test category 2');

    await user.selectOptions(categories, '');
  });

  it('should auto select all if category not provided', async () => {
    render(<Header filter={{}} applyFilter={() => {}} />);

    expect(await screen.findByTestId('category')).toHaveValue('');
  });

  it('should auto select category if provided', async () => {
    render(<Header filter={initialFilter} applyFilter={() => {}} />);

    expect(await screen.findByTestId('category')).toHaveValue(
      'test category 2'
    );
  });

  it('should change filter on changing category', async () => {
    const applyFilter = vi.fn();
    render(<Header filter={initialFilter} applyFilter={applyFilter} />);

    const user = userEvent.setup();

    const categories = await screen.findByTestId('category');

    await user.selectOptions(categories, 'test category 1');

    expect(applyFilter).toHaveBeenCalledOnce();
  });
});

describe('Sort Selection', () => {
  it('should render sort selection dropdown', () => {
    render(<Header filter={initialFilter} applyFilter={() => {}} />);

    expect(screen.getByTestId('sort')).toBeInTheDocument();
  });

  it('should list all sort options', async () => {
    render(<Header filter={initialFilter} applyFilter={() => {}} />);

    const user = userEvent.setup();

    const sort = await screen.findByTestId('sort');

    await user.selectOptions(sort, '');

    await user.selectOptions(sort, 'descending');
  });

  it('should auto select Ascending if sort not provided', async () => {
    render(<Header filter={{}} applyFilter={() => {}} />);

    expect(await screen.findByTestId('sort')).toHaveValue('');
  });

  it('should auto select sort if provided', async () => {
    render(<Header filter={initialFilter} applyFilter={() => {}} />);

    expect(await screen.findByTestId('sort')).toHaveValue('descending');
  });

  it('should change filter on changing sort', async () => {
    const applyFilter = vi.fn();
    render(<Header filter={initialFilter} applyFilter={applyFilter} />);

    const user = userEvent.setup();

    const sort = await screen.findByTestId('sort');

    await user.selectOptions(sort, '');

    expect(applyFilter).toHaveBeenCalledOnce();
  });
});
