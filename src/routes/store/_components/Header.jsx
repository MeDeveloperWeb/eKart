import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import filterIcon from '../../../assets/icons/filter.svg?react';
import searchIcon from '../../../assets/icons/search.svg?react';
import sortIcon from '../../../assets/icons/sort.svg?react';
import { getCategories } from '../../_lib/store';
import DropDown from './DropDown';

export default function Header({ filter, applyFilter }) {
  const sortFilters = ['descending'];
  const [search, setSearch] = useState(filter.search || '');

  const searchQuery = () =>
    applyFilter({
      search
    });

  const resetSearch = () =>
    applyFilter({
      search: ''
    });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const categories = await getCategories();

      if (!categories.error) setCategories(categories);
    }

    fetchCategories();
  }, []);

  return (
    <div className="mx-auto my-0 flex max-w-4xl flex-wrap items-center justify-evenly gap-3 px-4 py-8 text-gray-700 lg:gap-4">
      <div className="flex min-w-[min(200px,100%)] flex-1 items-center">
        <input
          type="search"
          name="search"
          className="w-full rounded-md py-3 pl-4 pr-10 shadow-md"
          value={search}
          onChange={({ target }) => {
            setSearch(target.value);
            target.value === '' && resetSearch();
          }}
          onKeyDown={({ key }) => key === 'Enter' && searchQuery()}
        />
        <button className="-mx-8" type="submit" onClick={searchQuery}>
          {searchIcon()}
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <DropDown
          options={categories}
          icon={filterIcon}
          name={'filter'}
          value={filter.category}
          onChange={({ target }) => applyFilter({ category: target.value })}
        >
          All
        </DropDown>
        <DropDown
          options={sortFilters}
          icon={sortIcon}
          name={'sort'}
          value={filter.sort}
          onChange={({ target }) => applyFilter({ sort: target.value })}
        >
          Ascending
        </DropDown>
      </div>
    </div>
  );
}

Header.propTypes = {
  filter: PropTypes.shape({
    category: PropTypes.string,
    search: PropTypes.string,
    sort: PropTypes.string
  }),
  applyFilter: PropTypes.func
};
