import filterIcon from '../../../assets/icons/filter.svg?react';
import sortIcon from '../../../assets/icons/sort.svg?react';
import searchIcon from '../../../assets/icons/search.svg?react';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function Header({ setFilter }) {
  const [search, setSearch] = useState('');

  const searchQuery = () =>
    setFilter((filter) => ({
      ...filter,
      category: '',
      search
    }));

  return (
    <div className="mx-auto my-0 flex max-w-2xl items-center justify-evenly gap-3 px-2 py-8 text-gray-700 lg:gap-4">
      <div className="flex flex-1 items-center">
        <input
          type="search"
          name="search"
          className="w-full rounded-md py-3 pl-4 pr-10 shadow-md"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          onKeyDown={({ key }) => key === 'enter' && searchQuery()}
        />
        <button className="-mx-8" type="submit" onClick={searchQuery}>
          {searchIcon()}
        </button>
      </div>
      <button className="flex items-center gap-2 rounded-md text-sm font-medium lg:bg-white lg:px-4 lg:py-2 lg:shadow-md">
        {filterIcon()} <p className="sr-only lg:not-sr-only">Filter</p>
      </button>
      <button className="flex items-center gap-2 rounded-md text-sm font-medium lg:bg-white lg:px-4 lg:py-2 lg:shadow-md">
        {sortIcon()} <p className="sr-only lg:not-sr-only">Sort</p>
      </button>
    </div>
  );
}

Header.propTypes = {
  filter: PropTypes.shape({
    category: PropTypes.string,
    search: PropTypes.string,
    sort: PropTypes.string
  }),
  setFilter: PropTypes.func
};
