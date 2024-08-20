import { useEffect, useState } from 'react';
import Header from './_components/Header';
import Product from '../_components/Product';
import { getProducts } from '../_lib/storeUtil';
import LoadingSvg from '../../assets/icons/loading.svg?react';
import { useSearchParams } from 'react-router-dom';

export default function Store() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filter, setFilter] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('q') || '',
    sort: searchParams.get('sort') || ''
  });

  const applyFilter = (newFilter) => {
    setFilter({
      ...filter,
      ...newFilter
    });

    const paramObj = {};

    for (const i in filter) {
      if (newFilter[i] ?? filter[i]) paramObj[i] = newFilter[i] ?? filter[i];

      if (paramObj.search) {
        paramObj.q = paramObj.search;
        delete paramObj.search;
      }
    }

    setSearchParams(paramObj);
  };

  const [products, setProducts] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      const products = await getProducts(filter);
      setProducts(products);
    }
    fetchProducts();
  }, [filter]);

  return (
    <main className="flex flex-1 flex-col">
      <Header filter={filter} applyFilter={applyFilter} />
      {!products ? (
        <div className="flex h-full flex-1 items-center justify-center">
          <LoadingSvg width={60} height={60} />
        </div>
      ) : !products.length ? (
        <div className="flex items-center justify-center p-20">
          No Items Found!
        </div>
      ) : (
        <div className="grid flex-1 grid-cols-2 gap-4 px-2 pb-16 pt-4 md:grid-cols-3 md:gap-8 md:px-4 lg:grid-cols-4">
          {products.map((product) => (
            <Product
              key={product.id}
              image={product.image}
              title={product.title}
              id={product.id}
            />
          ))}
        </div>
      )}
    </main>
  );
}
